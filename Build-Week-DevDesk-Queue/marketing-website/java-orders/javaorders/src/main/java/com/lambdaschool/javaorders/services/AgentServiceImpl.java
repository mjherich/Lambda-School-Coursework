package com.lambdaschool.javaorders.services;

import com.lambdaschool.javaorders.models.Agent;
import com.lambdaschool.javaorders.repos.AgentsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Transactional
@Service(value = "agentservice")
public class AgentServiceImpl implements AgentService
{
    @Autowired
    private AgentsRepository agentrepos;

    @Transactional
    @Override
    public Agent save(Agent agent)
    {
        Agent newAgent = new Agent();

        newAgent.setAgentname(agent.getAgentname());
        newAgent.setWorkingarea(agent.getWorkingarea());
        newAgent.setCommission(agent.getCommission());
        newAgent.setPhone(agent.getWorkingarea());
        newAgent.setCountry(agent.getWorkingarea());
        newAgent.setCustomers(agent.getCustomers());

        return agentrepos.save(newAgent);
    }
}
