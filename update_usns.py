import re

usn_data = '''AISHWARYA A R — 4MC22CI001
AKASH HARIHAR — 4MC22CI002
ANKITA — 4MC22CI003
ANUSHA B M — 4MC22CI004
ARCHANA K — 4MC22CI005
ARJUN D — 4MC22CI006
AVANEESH HONNAPPA — 4MC22CI007
BHOOMIKA L B — 4MC22CI008
DEEKSHA H P — 4MC22CI009
DEEKSHA S — 4MC22CI010
DHAVAN H S — 4MC22CI011
HARSHITHA B V — 4MC22CI012
KEERTHANA H N — 4MC22CI013
KUMUDA D P — 4MC22CI014
LIKITHA H Y — 4MC22CI015
MANIKYA K — 4MC22CI016
MUSKAN — 4MC22CI017
NANDAN JAVAGAL — 4MC22CI018
NIDA FATHIMA — 4MC22CI019
NITHYASHREE C P — 4MC22CI020
PRARTHANA B G — 4MC22CI021
PRATHAM D U — 4MC22CI022
PRATHAM M JAIN — 4MC22CI023
RAKSHITHA K S — 4MC22CI024
SAMYUKTHA H S — 4MC22CI025
SANJANA S V — 4MC22CI026
SINCHANA G P — 4MC22CI027
TEJASWI H T — 4MC22CI028
THEJASWINI L GOWDA — 4MC22CI029
VEDANTH R — 4MC22CI030
VIJAY KUMAR S B — 4MC22CI031
SWATHI U — 4MC23CI402'''

usn_map = {}
for line in usn_data.split('\n'):
    if '—' in line:
        name, usn = line.split('—')
        usn_map[name.strip().lower().replace(' ', '')] = usn.strip()

with open('src/data/index.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Add usn?: string; to interface
content = re.sub(r'hidden\?: boolean;\n}', r'hidden?: boolean;\n  usn?: string;\n}', content)

# For each object in alumniData, try to match the name and add usn
def replace_usn(match):
    block = match.group(0)
    name_match = re.search(r'name:\s*\"([^\"]+)\"', block)
    if name_match:
        name = name_match.group(1).lower().replace(' ', '')
        if name in usn_map:
            usn = usn_map[name]
            return re.sub(r'(name:\s*\"[^\"]+\",)', r'\1\n    usn: "' + usn + '",', block)
    return block

content = re.sub(r'\{\s*id:\s*\d+,[\s\S]*?(?=\n  \}|\n\})', replace_usn, content)

with open('src/data/index.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print('Updated index.ts')
