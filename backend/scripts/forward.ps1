Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public class KeyboardSimulator {
    [DllImport("user32.dll")]
    public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, uint dwExtraInfo);

    public const int KEYEVENTF_KEYDOWN = 0x0000;
    public const int KEYEVENTF_KEYUP = 0x0002;
    public const int VK_SHIFT = 0x10;
    public const int VK_N = 0x4E;

    public static void SendShiftN() {
        // Press Shift
        keybd_event(VK_SHIFT, 0, KEYEVENTF_KEYDOWN, 0);
        // Press N while Shift is held down
        keybd_event(VK_N, 0, KEYEVENTF_KEYDOWN, 0);
        // Release N
        keybd_event(VK_N, 0, KEYEVENTF_KEYUP, 0);
        // Release Shift
        keybd_event(VK_SHIFT, 0, KEYEVENTF_KEYUP, 0);
    }
}
"@

[KeyboardSimulator]::SendShiftN()
