package com.lambdaschool.devdeskqueue.services;

import com.lambdaschool.devdeskqueue.models.*;
import com.lambdaschool.devdeskqueue.exceptions.ResourceFoundException;
import com.lambdaschool.devdeskqueue.exceptions.ResourceNotFoundException;
import com.lambdaschool.devdeskqueue.repository.RoleRepository;
import com.lambdaschool.devdeskqueue.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;


@Service(value = "userService")
public class UserServiceImpl implements UserDetailsService, UserService
{

    @Autowired
    private UserRepository userrepos;

    @Autowired
    private RoleRepository rolerepos;

    @Transactional
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException
    {
        User user = userrepos.findByUsername(username);
        if (user == null)
        {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.getAuthority());
    }

    public User findUserById(long id) throws ResourceNotFoundException
    {
        return userrepos.findById(id)
                        .orElseThrow(() -> new ResourceNotFoundException("User id " + id + " not found!"));
    }

    @Override
    public List<User> findAll()
    {
        List<User> list = new ArrayList<>();
        userrepos.findAll()
                 .iterator()
                 .forEachRemaining(list::add);
        return list;
    }

    @Transactional
    @Override
    public void delete(long id)
    {
        userrepos.findById(id)
                 .orElseThrow(() -> new ResourceNotFoundException("User id " + id + " not found!"));
        userrepos.deleteById(id);
    }

    @Override
    public User findByName(String name)
    {
        User uu = userrepos.findByUsername(name);
        if (uu == null)
        {
            throw new ResourceNotFoundException("User name " + name + " not found!");
        }
        return uu;
    }

    @Transactional
    @Override
    public User save(User user)
    {
        if (userrepos.findByUsername(user.getUsername()) != null)
        {
            throw new ResourceFoundException(user.getUsername() + " is already taken!");
        }

        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPasswordNoEncrypt(user.getPassword());

        ArrayList<UserRoles> newRoles = new ArrayList<>();
        for (UserRoles ur : user.getUserroles())
        {
            long id = ur.getRole()
                        .getRoleid();
            Role role = rolerepos.findById(id)
                                 .orElseThrow(() -> new ResourceNotFoundException("Role id " + id + " not found!"));
            newRoles.add(new UserRoles(newUser, ur.getRole()));
        }
        newUser.setUserroles(newRoles);

        for (Useremail ue : user.getUseremails())
        {
            newUser.getUseremails()
                   .add(new Useremail(newUser, ue.getUseremail()));
        }

        return userrepos.save(newUser);
    }

    @Transactional
    @Override
    public User saveStudent(UserMinimum student)
    {
        if (userrepos.findByUsername(student.getUsername()) != null)
        {
            throw new ResourceFoundException(student.getUsername() + " is already taken!");
        }

        User newStudent = new User();
        newStudent.setUsername(student.getUsername());
        newStudent.setPassword(student.getPassword());

        // Setting student role
        ArrayList<UserRoles> students = new ArrayList<>();
        Role studRole = rolerepos.findByNameIgnoreCase("student");
        students.add(new UserRoles(newStudent, studRole));
        newStudent.setUserroles(students);

        // Add student email
        newStudent.getUseremails()
                .add(new Useremail(newStudent, student.getEmail()));

        return userrepos.save(newStudent);
    }

    @Transactional
    @Override
    public User saveHelper(UserMinimum helper)
    {
        if (userrepos.findByUsername(helper.getUsername()) != null)
        {
            throw new ResourceFoundException(helper.getUsername() + " is already taken!");
        }

        User newHelper = new User();
        newHelper.setUsername(helper.getUsername());
        newHelper.setPassword(helper.getPassword());

        // Setting helper role
        ArrayList<UserRoles> helpers = new ArrayList<>();
        Role studRole = rolerepos.findByNameIgnoreCase("helper");
        helpers.add(new UserRoles(newHelper, studRole));
        newHelper.setUserroles(helpers);

        // Add student email
        newHelper.getUseremails()
                .add(new Useremail(newHelper, helper.getEmail()));

        User createdHelper = userrepos.save(newHelper);
        return createdHelper;
    }



    @Transactional
    @Override
    public User update(User user, long id, boolean isAdmin)
    {
        Authentication authentication = SecurityContextHolder.getContext()
                                                             .getAuthentication();
        User currentUser = userrepos.findByUsername(authentication.getName());

        if (id == currentUser.getUserid() || isAdmin)
        {
            if (user.getUsername() != null)
            {
                currentUser.setUsername(user.getUsername());
            }

            if (user.getPassword() != null)
            {
                currentUser.setPasswordNoEncrypt(user.getPassword());
            }

            if (user.getUserroles()
                    .size() > 0)
            {
                throw new ResourceFoundException("User Roles are not updated through User");
            }

            if (user.getUseremails()
                    .size() > 0)
            {
                for (Useremail ue : user.getUseremails())
                {
                    currentUser.getUseremails()
                               .add(new Useremail(currentUser, ue.getUseremail()));
                }
            }

            return userrepos.save(currentUser);
        } else
        {
            throw new ResourceNotFoundException(id + " Not current user");
        }
    }

    @Transactional
    @Override
    public void deleteUserRole(long userid, long roleid)
    {
        userrepos.findById(userid)
                 .orElseThrow(() -> new ResourceNotFoundException("User id " + userid + " not found!"));
        rolerepos.findById(roleid)
                 .orElseThrow(() -> new ResourceNotFoundException("Role id " + roleid + " not found!"));

        if (rolerepos.checkUserRolesCombo(userid, roleid)
                     .getCount() > 0)
        {
            rolerepos.deleteUserRoles(userid, roleid);
        } else
        {
            throw new ResourceNotFoundException("Role and User Combination Does Not Exists");
        }
    }

    @Transactional
    @Override
    public void addUserRole(long userid, long roleid)
    {
        userrepos.findById(userid)
                 .orElseThrow(() -> new ResourceNotFoundException("User id " + userid + " not found!"));
        rolerepos.findById(roleid)
                 .orElseThrow(() -> new ResourceNotFoundException("Role id " + roleid + " not found!"));

        if (rolerepos.checkUserRolesCombo(userid, roleid)
                     .getCount() <= 0)
        {
            rolerepos.insertUserRoles(userid, roleid);
        } else
        {
            throw new ResourceFoundException("Role and User Combination Already Exists");
        }
    }
}
