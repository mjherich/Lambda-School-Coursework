import sys

PRINT_BEEJ      = 1  # 0000 0001
HALT            = 2  # 0000 0010
PRINT_NUM       = 3
SAVE            = 4
PRINT_REGISTER  = 5  # Saves a value to a register
ADD             = 6
PUSH            = 7
POP             = 8
CALL            = 9
RET             = 10

# memory = [
#     PRINT_BEEJ,
#     SAVE,       # Saves the value 65 to register 2
#     65,
#     2,
#     SAVE,       # Saves the value 20 to register 3
#     20,
#     1,
#     ADD,        # Adds the value from register 2 to register 3
#     2,
#     3,
#     PRINT_REGISTER,  # Print the value in register 2
#     2,
#     PRINT_BEEJ,
#     PRINT_BEEJ,
#     PRINT_BEEJ,
#     HALT,
# ]

memory = [0] * 256
registers = [0] * 8
SP = 0
pc = 0
running = True

def load_memory(filename):
    try:
        address = 0
        with open(filename) as f:
            for line in f:
                # Ignore comments
                comment_split = line.split("#")
                num = comment_split[0].strip()

                if num == "":
                    continue

                value = int(num)

                memory[address] = value
                address += 1

    except FileNotFoundError:
        print(f"{sys.argv[0]}: {filename} not found")
        sys.exit(2)


if len(sys.argv) != 2:
    print("Usage: file.py filename", file=sys.stderr)
    sys.exit(1)

load_memory(sys.argv[1])

print(memory)

while running:
    # Execute

    command = memory[pc]
    print(command)

    if command == PRINT_BEEJ:
        print("Beej!")
        pc += 1
    elif command == PRINT_NUM:
        num = memory[pc+1]
        print(num)
        pc += 2
    elif command == HALT:
        running = False
        pc += 1
    elif command == SAVE:
        num = memory[pc+1]
        reg = memory[pc+2]
        registers[reg] = num
        pc += 3
    elif command == ADD:
        reg_a = memory[pc+1]
        reg_b = memory[pc+2]
        registers[reg_a] += registers[reg_b]
        pc += 3
    elif command == PRINT_REGISTER:
        reg = memory[pc + 1]
        print(registers[reg])
        pc += 2
    elif command == PUSH:
        reg = memory[pc + 1]
        val = registers[reg]
        # Decrement the SP
        registers[SP] -= 1
        # Copy the value in the given register to the address pointed to by the 
        memory[registers[SP]] = val
        # Increment PC by 3
        pc += 2
    elif command == POP:
        reg = memory[pc + 1]
        # Copy the value from the address pointed to by SP to the given register
        val = memory[registers[SP]]
        registers[reg] = val
        # Increment the SP
        registers[SP] += 1
        # Increment PC by 2
        pc += 2
    elif command == CALL:
        # The address of the instruction directly after CALL is pushed onto the stack.
        val = pc + 2
        registers[SP] -= 1
        memory[registers[SP]] = val
        # The PC is set to the address stored in the given register.
        reg = memory[pc + 1]
        subroutine_address = registers[reg]
        print(f"CALLING SR AT ADDRESS {subroutine_address % 256}")
        # We jump to that location in RAM and execute the first instruction in the subroutine.
        # The PC can move forward or backwards from its current location.
        pc = subroutine_address
    elif command == RET:
        # Return from subroutine.
        # Pop the value from the top of the stack and store it in the PC.
        return_address = registers[SP]
        print(f"RETURNING TO ADDRESS {return_address % 256}")
        pc = memory[return_address]
        # Increment the SP by 1
        registers[SP] += 1
    else:
        print(f"Error: Unkown command: {command}")
        sys.exit(1)