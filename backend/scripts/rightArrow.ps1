Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public class KeyboardSimulator
{
    [DllImport("user32.dll", SetLastError = true)]
    public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, UIntPtr dwExtraInfo);

    public const int KEYEVENTF_KEYDOWN = 0x0000;
    public const int KEYEVENTF_KEYUP = 0x0002;
    public const int VK_RIGHT = 0x27; // Virtual key code for the right arrow key

    public static void SimulateRightArrow()
    {
        keybd_event((byte)VK_RIGHT, 0, KEYEVENTF_KEYDOWN, UIntPtr.Zero);
        keybd_event((byte)VK_RIGHT, 0, KEYEVENTF_KEYUP, UIntPtr.Zero);
    }
}
"@

[KeyboardSimulator]::SimulateRightArrow()
