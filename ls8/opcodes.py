# Opcodes for branch table
LDI = 0b10000010    # Load value to register
ST = 0b10000100     # Store value in operand_b in address in operand_a
PRN = 0b01000111    # Print value stored in register
PRA = 0b01001000    # Print alpha character value stored in the given register.
NOP = 0b00000000    # Does nothing
HLT = 0b00000001    # Halt execution of the program
# ALU opcodes
MUL = 0b10100010    # Multiply operands
DIV = 0b10100011    # Divide operands
ADD = 0b10100000    # Add operands
SUB = 0b10100001    # Subtract operands
MOD = 0b10100100    # operand_a mod operand_b
CMP = 0b10100111    # Compare operands
AND = 0b10101000    # Bitwise AND operands
NOT = 0b01101001    # Bitwise NOT on val in register
OR = 0b10101010     # Bitwise OR on operands
SHL = 0b10101100    # Shift value in operand_a left by bits specified in operand_b
SHR = 0b10101101    # Shift value in operand_a right by bits specified in operand_b
XOR = 0b10101011    # Bitwise XOR operand_a with operand_b, store result in reg_a
DEC = 0b01100110    # Decrease value in given register
INC = 0b01100101    # Increase value in given register
# Stack opcodes
PUSH = 0b01000101   # Push value from register to stack
POP = 0b01000110    # Pop value from top of stack
# Call opcodes
CALL = 0b01010000   # Push address of the instruction directly after opcode to the stack
RET = 0b00010001    # Pop the value from the top of the stack
# Interrupt opcodes
INT = 0b01010010    # Issue interrupt
IRET = 0b00010011   # Return from an interrupt handler
# Flag opcodes
JEQ = 0b01010101    # If equal flag is set (true), jump to the address stored in the given register.
JGE = 0b01011010    # If greater-than flag or equal flag is set (true), jump to the address stored in the given register.
JGT = 0b01010111    # If greater-than flag is set (true), jump to the address stored in the given register.
JLE = 0b01011001    # If less-than flag or equal flag is set (true), jump to the address stored in the given register.
JLT = 0b01011000    # If less-than flag is set (true), jump to the address stored in the given register.
JMP = 0b01010100    # Jump to the address stored in the given register.
JNE = 0b01010110    # If E flag is clear (false, 0), jump to the address stored in the given register.
LD = 0b01010110     # Loads registerA with the value at the memory address stored in registerB.