# qb-lockpick
 NoPixel Based Lockpick for QBFramework

# Changes
- Decreased the size of the correct zone by a lot
- Some assorted CSS changes.
- Added in a "pause" function that makes the moving bar freeze on keypress to give the player a bit feedback on if they succeeded or not.
- Added a small amount of "padding" to the correct zones since the zone is smaller.  This limits the times that a player can hit the edge of the zone and it not count as a success, and with the pause function allows players to see exactly where they are off at if they are incorrect.

# Template
exports['qb-lock']:StartLockPickCircle(amount, time, function(success)

# Example useage

RegisterCommand("lpgame", function()
	local time = math.random(7,10)
	local circles = math.random(2,4)
	local success = exports['qb-lock']:StartLockPickCircle(circles, time, success)
	print(success)
	if success then
		print("WIN")
	else
		print("FAIL")
	end
end)
	
# Amount of time to spin and amount of time to trigger are currently held within the js I am trying to export it to lua
# Amount and Time now work, but functioning success now doesn't go over to the export.
# Fixed the Lockpick now ready for use, enjoy!

CREDITS TO https://github.com/Tex27 [Tex#9999] for the UI Update
