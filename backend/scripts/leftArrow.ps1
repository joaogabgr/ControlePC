Add-Type -TypeDefinition @"
using System;
using System.Runtime.InteropServices;

public class KeyboardSimulator
{
    [DllImport("user32.dll", SetLastError = true)]
    public static extern void keybd_event(byte bVk, byte bScan, uint dwFlags, UIntPtr dwExtraInfo);

    public const int KEYEVENTF_KEYDOWN = 0x0000;
    public const int KEYEVENTF_KEYUP = 0x0002;
    public const int VK_LEFT = 0x25; // Virtual key code for the left arrow key

    public static void SimulateLeftArrow()
    {
        keybd_event((byte)VK_LEFT, 0, KEYEVENTF_KEYDOWN, UIntPtr.Zero);
        keybd_event((byte)VK_LEFT, 0, KEYEVENTF_KEYUP, UIntPtr.Zero);
    }
}
"@

[KeyboardSimulator]::SimulateLeftArrow()
