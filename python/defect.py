from ovito.modifiers import *

mod = WignerSeitzAnalysisModifier()
mod.reference.load("frame0000.dump")
node.modifiers.append(mod)
node.compute()
print("Number of vacant sites: %i" % node.output.attributes['WignerSeitz.vacancy_count'])
