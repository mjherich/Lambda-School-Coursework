"""CPU functionality."""

import sys

# Opcodes for branch table
LDI = 0b10000010    # Load value to register
PRN = 0b01000111    # Print value stored in register
HLT = 0b00000001    # Halt execution of the program
# ALU opcodes
MUL = 0b10100010    # Multiply operands
DIV = 0b10100011    # Divide operands
ADD = 0b10100000    # Add operands
SUB = 0b10100001    # Subtract operands
# Stack opcodes
PUSH = 0b01000101   # Push value from register to stack
POP = 0b01000110    # Pop value from top of stack
# Call opcodes
CALL = 0b01010000   # Push address of the instruction directly after opcode to the stack
RET = 0b00010001    # Pop the value from the top of the stack

class CPU:
    """Main CPU class."""

    def __init__(self):
        """Construct a new CPU."""
        self.registers = [0] * 8    # List for storing registers R0 - R7
                                    # R5: Interrupt Mask (IM), R6: Interrupt Status (IS), R7: Stack Pointer (SP)
        self.registers[7] = 0xF4    # Initialize stack pointer at R7 to 0xF4
        self.ram = [0] * 256        # Ram contains 256 bytes of memory
        self.pc = 0                 # Program Counter, address of the currently executing instruction
        self._halted = False        # Used for run(), set to False in HLT()
        self.branch_table = {}
        self.branch_table[LDI] = self.handle_LDI
        self.branch_table[PRN] = self.handle_PRN
        self.branch_table[MUL] = self.handle_MUL
        self.branch_table[DIV] = self.handle_DIV
        self.branch_table[ADD] = self.handle_ADD
        self.branch_table[SUB] = self.handle_SUB
        self.branch_table[HLT] = self.handle_HLT
        self.branch_table[PUSH] = self.handle_PUSH
        self.branch_table[POP] = self.handle_POP
        self.branch_table[CALL] = self.handle_CALL
        self.branch_table[RET] = self.handle_RET


    def load(self, filename):
        """Load a program into memory."""
        try:
            address = 0
            with open(filename) as f:
                for line in f:
                    # Ignore comments
                    comment_split = line.split("#")
                    num = comment_split[0].strip()

                    if num == "":
                        continue

                    value = eval(f"0b{num}")

                    self.ram_write(address, value)
                    address += 1
            print(f"File {filename} successfully loaded into memory: ", cpu.ram)

        except FileNotFoundError:
            print(f"{sys.argv[0]}: {filename} not found")
            sys.exit(2)

    def ram_read(self, MAR):
        return self.ram[MAR]

    def ram_write(self, MAR, MDR):
        self.ram[MAR] = MDR

    def alu(self, op, reg_a, reg_b):
        """ALU operations."""

        if op == "ADD":
            self.registers[reg_a] += self.registers[reg_b]
        elif op == "SUB":
            self.registers[reg_a] -= self.registers[reg_b]
        elif op == "MUL":
            self.registers[reg_a] *= self.registers[reg_b]
        elif op == "DIV":
            self.registers[reg_a] /= self.registers[reg_b]
        else:
            raise Exception("Unsupported ALU operation")

    def handle_LDI(self, operand_a, operand_b):
        self.registers[operand_a] = operand_b
        self.pc += 3

    def handle_PRN(self, operand_a, operand_b):
        print(self.registers[operand_a])
        self.pc += 2

    def handle_MUL(self, operand_a, operand_b):
        self.alu("MUL", operand_a, operand_b)
        self.pc += 3

    def handle_DIV(self, operand_a, operand_b):
        self.alu("DIV", operand_a, operand_b)
        self.pc += 3

    def handle_ADD(self, operand_a, operand_b):
        self.alu("ADD", operand_a, operand_b)
        self.pc += 3

    def handle_SUB(self, operand_a, operand_b):
        self.alu("SUB", operand_a, operand_b)
        self.pc += 3

    def handle_HLT(self, operand_a, operand_b):
        self._halted = True

    def handle_PUSH(self, operand_a, operand_b):
        # Decrease stack pointer located at R7 by 1
        self.registers[7] -= 1
        # Get value
        val = self.registers[operand_a]
        self.ram_write(self.registers[7], val)
        self.pc += 2

    def handle_POP(self, operand_a, operand_b):
        # Store val to address stored in registers[operand_a]
        val = self.ram_read(self.registers[7])
        self.registers[operand_a] = val
        # Increase the stack pointer (R7) by one
        self.registers[7] += 1
        self.pc += 2

    def handle_CALL(self, operand_a, operand_b):
        # Push the address of the instruction directly after operand_a onto stack
        address = self.pc + 2
        self.registers[7] -= 1
        self.ram_write(self.registers[7], address)
        # Set PC to val stored in registers[operand_a]
        self.pc = self.registers[operand_a]

    def handle_RET(self, operand_a, operand_b):
        # Return from subroutine
        # Pop the value from the top of the stack and store it in the PC.
        return_address = self.registers[7]
        self.pc = self.ram_read(return_address)
        # Increase stack pointer by one (stack is stored growing downwards from top of ram)
        self.registers[7] += 1

    def trace(self):
        """
        Handy function to print out the CPU state. You migh t want to call this
        from run() if you need help debugging.
        """

        print(f"TRACE: %02X | %02X %02X %02X |" % (
            self.pc,
            #self.fl,
            #self.ie,
            self.ram_read(self.pc),
            self.ram_read(self.pc + 1),
            self.ram_read(self.pc + 2)
        ), end='')

        for i in range(8):
            print(" %02X" % self.registers[i], end='')

        print()

    def run(self):
        """Run the CPU."""
        # PC = self.pc
        while not self._halted:
            # Get the instruction from ram and store in local instruction register
            IR = self.ram_read(self.pc)
            # print("IR: ", format(IR, "08b"))
            # Get operands
            operand_a = self.ram_read(self.pc + 1)
            # print("operand_a: ", format(operand_a, "08b"))
            operand_b = self.ram_read(self.pc + 2)
            # print("operand_b: ", format(operand_b, "08b"))
            # Run the correct operation using the branch table
            try:
                self.branch_table[IR](operand_a, operand_b)
            except:
                self.trace()
                raise Exception(f"Command {IR} does not exist")


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: file.py filename", file=sys.stderr)
        sys.exit(1)
    cpu = CPU()
    cpu.load(sys.argv[1])

    cpu.run()