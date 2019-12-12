
// Select commands

atomsk dump_box_4.cfg -select in box 0.125*BOX 0.125*BOX 0.1*BOX 0.875*BOX 0.875*BOX 0.9*BOX -rmatom select box_padding.cfg
atomsk dump_box_4.cfg -select out box 0.125*BOX 0.125*BOX 0.1*BOX 0.875*BOX 0.875*BOX 0.9*BOX -rmatom select box_fill.cfg

// Convert atom types for visualization

atomsk combined_system1.lmp -sub 1 Fe -sub 2 Ni -sub 3 Cr combined_system1.lmp -ow

atomsk --merge 2 padding.cfg system1.cfg combined_system1.cfg

atomsk combined_system1.cfg lammps

Go into lammps input file and swap Fe -> Cr, Ni -> Cr

// Make a bash script to handle atomsk merging and conversion?
