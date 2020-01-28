"""CPU functionality."""

import sys

class CPU:
    """Main CPU class."""

    def __init__(self):
        """Construct a new CPU."""
        self.registers = [0] * 8  # List for storing registers R0 - R7
                                  # R5: Interrupt Mask (IM), R6: Interrupt Status (IS), R7: Stack Pointer (SP)
        self.ram = [0] * 256      # Ram contains 256 bytes of memory
        self.pc = 0               # Program Counter, address of the currently executing instruction

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
        PC = self.pc
        halted = False
        while not halted:
            # Get the instruction from ram and store in local instruction register
            IR = self.ram_read(PC)
            # Get operands
            operand_a = self.ram_read(PC + 1)
            operand_b = self.ram_read(PC + 2)
            # Run the correct operation
            if IR == 0b10000010:      # LDI
                self.registers[operand_a] = operand_b
                PC += 3
            elif IR == 0b01000111:    # PRN
                print(self.registers[operand_a])
                PC += 2
            elif IR == 0b10100010:    # MUL
                product = self.registers[operand_a] * self.registers[operand_b]
                self.registers[operand_a] = product
                PC += 3
            elif IR == 0b00000001:    # HLT
                halted = True
            else:
                raise Exception(f"Command {IR} does not exist")


if __name__ == '__main__':
    if len(sys.argv) != 2:
        print("Usage: file.py filename", file=sys.stderr)
        sys.exit(1)
    cpu = CPU()
    cpu.load(sys.argv[1])

    cpu.run()