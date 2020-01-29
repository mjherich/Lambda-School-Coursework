"""CPU functionality."""

import sys

# Opcodes for branch table
LDI = 0b10000010
PRN = 0b01000111
MUL = 0b10100010
HLT = 0b00000001

class CPU:
    """Main CPU class."""

    def __init__(self):
        """Construct a new CPU."""
        self.registers = [0] * 8    # List for storing registers R0 - R7
                                    # R5: Interrupt Mask (IM), R6: Interrupt Status (IS), R7: Stack Pointer (SP)
        self.ram = [0] * 256        # Ram contains 256 bytes of memory
        self.pc = 0                 # Program Counter, address of the currently executing instruction
        self._halted = False        # Used for run(), set to False in HLT()
        self.branch_table = {}
        self.branch_table[LDI] = self.handle_LDI
        self.branch_table[PRN] = self.handle_PRN
        self.branch_table[MUL] = self.handle_MUL
        self.branch_table[HLT] = self.handle_HLT


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
            self.reg[reg_a] += self.reg[reg_b]
        #elif op == "SUB": etc
        else:
            raise Exception("Unsupported ALU operation")

    def handle_LDI(self, operand_a, operand_b):
        print(f"running LDI: store {operand_b} in register {operand_a}")
        self.registers[operand_a] = operand_b
        self.pc += 3

    def handle_PRN(self, operand_a, operand_b):
        print(f"running PRN: print register {operand_a}")
        print(self.registers[operand_a])
        self.pc += 2

    def handle_MUL(self, operand_a, operand_b):
        print(f"running MUL: multiply registers {operand_a} and {operand_b} and store result in {operand_a}")
        product = self.registers[operand_a] * self.registers[operand_b]
        self.registers[operand_a] = product
        self.pc += 3

    def handle_HLT(self, operand_a, operand_b):
        print("running HLT")
        self._halted = True


    def trace(self):
        """
        Handy function to print out the CPU state. You might want to call this
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
            print(" %02X" % self.reg[i], end='')

        print()

    def run(self):
        """Run the CPU."""
        # PC = self.pc
        while not self._halted:
            # Get the instruction from ram and store in local instruction register
            IR = self.ram_read(self.pc)
            # Get operands
            operand_a = self.ram_read(self.pc + 1)
            operand_b = self.ram_read(self.pc + 2)
            # Run the correct operation using the branch table
            try:
                self.branch_table[IR](operand_a, operand_b)
            except:
                raise Exception(f"Command {IR} does not exist")


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: file.py filename", file=sys.stderr)
        sys.exit(1)
    cpu = CPU()
    cpu.load(sys.argv[1])

    cpu.run()