# The Controls Exchange — LON FT-10 and Spyder field checklist

Use this on an authorized service call to a LonWorks TP/FT-10 network, such as one with Honeywell Classic Spyder LON (PUL/PVL) controllers. Work from the site's drawings and the official documents named in each section; they win over this sheet. Record what you find before you change anything.

Project / site:
Date / technician:
Supervisor (JACE model, Niagara/WEBs release):
Laptop tools and versions (OpenLDV, NodeUtil, LonScanner, Workbench):
USB network interface (model, revision, LON number):
Station backup taken (file name / time):

## Before you go

- [ ] Station backup and the Spyder applications/library are available, so a replacement controller can be matched and downloaded.
- [ ] Workbench has the Spyder feature licensed, or the controllers are "-ILC" models (Honeywell 63-2685).
- [ ] OpenLDV 5 is installed **before** the U10 is first plugged in; NodeUtil and the free LonScanner 5 are installed (EnOcean OpenLDV, NodeUtil and LonScanner pages).
- [ ] The U10 shows up in the LonWorks Interfaces control panel and its LON number is recorded (EnOcean KB1445, KB1446; Rev C: "U10 FT Rev C Changes").
- [ ] Meter, plastic or wooden pick for service pins, spare 209541B FTT termination modules, Level IV 22 AWG cable, labels.

## Controller identity

| Location / equipment | Model (PUL/PVL) | Neuron ID | Station name | Status LED | Online in station? |
| --- | --- | --- | --- | --- | --- |
| | | | | | |
| | | | | | |
| | | | | | |

Honeywell status LED (63-2685, Table 8): off = no power, low voltage or damaged; on steady = processor not operating; 1 s on / 1 s off = normal; 0.5 s = alarm, download in progress or lost configuration; 0.25 s = firmware loading; 0.1 s = manual mode under the PC tool.

## Power and grounding (Honeywell 63-2685)

| Check | Expected | Measured / observed | OK? |
| --- | --- | --- | --- |
| Supply at the controller (terminals 1–2) | 20–30 Vac; at least 20 Vac at the controller | | |
| Transformer | Class 2, 100 VA or less, sized for the connected loads | | |
| Shared transformer phasing | Same secondary side to the same terminal on every controller | | |
| Earth ground (terminal 3) | Short run to a verified earth ground | | |
| I/O commons | Not connected to earth ground | | |

## FT-10 bus (Honeywell 63-2685 and 63-1325; Echelon FTT-10A guide; EnOcean KB1461)

| Check | Expected | Observed | OK? |
| --- | --- | --- | --- |
| Topology | Free topology (singly terminated) or daisy-chain bus (doubly terminated), as drawn | | |
| Termination | Free topology: one terminator; bus: one at each end (209541B on Honeywell jobs) | | |
| Terminator test | A DC ohmmeter can't verify an RC terminator; check placement and parts (KB1461) | | |
| Total bus length | Spyder bus up to 4,600 ft (1,400 m) on Level IV 22 AWG | | |
| Devices per segment | Spyder: 60 controllers, 120 with one Q7751 router as a repeater; never two repeaters in series | | |
| Cable | Twisted pair, no mixed wire types or gauges on a segment; not run with high-voltage or Triac output wiring | | |
| Polarity | Bus is polarity insensitive; neither wire is grounded | | |

## Network evidence

| Tool | What to record | Result |
| --- | --- | --- |
| LonWorks Interfaces → Comm | Press a controller's service pin; does the round trip answer? | |
| NodeUtil | Device found by service pin; status and error statistics | |
| LonScanner 5 | Channel load (aim under 40 %) and CRC error rate (aim under 4 %), per EnOcean KB1419 | |
| Niagara Lon Device Manager | Discover / Match result; device status | |

Keep laptop tools to monitoring and tests on a network the JACE manages; commissioning from a second tool can conflict with the supervisor. Honeywell routes Spyder tool work through the JACE's LON driver.

## Connecting a laptop with a USB interface (U10)

- [ ] Normal path for Spyder work: laptop to the JACE over IP, open the station, then Lon Device Manager → Discover → Match → Spyder Download. The JACE's FT-10 port does the LON work.
- [ ] Workbench alone does not discover LON devices; discovery runs in a station's LonWorks network. A station on the laptop using the U10 needs the LonWorks driver and the Spyder feature licensed (or "-ILC" controllers). Tridium does not support the LON FTT-10 USB adapter in Niagara 4 (results not guaranteed); Honeywell's WEBs-N4 guide says to use LON tunneling through a JACE or LON/IP.
- [ ] Commissioning or downloading from a laptop station takes the controller away from the JACE. Afterwards, Match and download it from the JACE again.
- [ ] Direct wiring: U10 wires to Spyder terminals 7 and 8 (Net-1/Net-2), either polarity; the controller still needs 24 Vac on 1–2 and earth on 3.
- [ ] Bench (laptop and one controller only): one 209541B terminator across 7–8. Live bus: add no terminator; the bus already has its own.

## Replacing a controller (Honeywell 63-2685 and 31-00089)

1. Record the old Neuron ID, model and station name. Lift the terminal blocks off with the wiring attached.
2. Fit an identical model, press the blocks back on and power up.
3. In the Lon Device Manager, Discover, then Match the new Neuron ID to the existing station device.
4. Download the application (Spyder Download), then check the status LED and points.

## Troubleshooting questions

Is the controller powered within range, and is the LED pattern normal?
Does the service pin reach the laptop interface and the JACE?
Is the bus terminated as drawn, and is any segment over length or over device count?
Do LonScanner errors rise when one area or device is involved?
Does the station show the right Neuron ID for each controller?

## Closeout

Evidence saved:
Changes made (wiring, terminators, replacements, downloads):
Station backup after changes:
Remaining issue and next action:
