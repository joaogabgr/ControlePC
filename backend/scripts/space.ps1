Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public class KeyboardSimulator {
    [DllImport("user32.dll")]
    public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, uint dwExtraInfo);

    public const int KEYEVENTF_KEYDOWN = 0x0000;
    public const int KEYEVENTF_KEYUP = 0x0002;
    public const int VK_SPACE = 0x20;

    public static void SendSpace() {
        keybd_event(VK_SPACE, 0, KEYEVENTF_KEYDOWN, 0);
        keybd_event(VK_SPACE, 0, KEYEVENTF_KEYUP, 0);
    }
}
"@

[KeyboardSimulator]::SendSpace()
