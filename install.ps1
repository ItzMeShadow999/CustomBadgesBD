$ErrorActionPreference = 'Stop'
try { [Console]::OutputEncoding = [System.Text.Encoding]::UTF8 } catch { }
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$Owner  = 'ItzMeShadow999'
$Repo   = 'CustomBadgesBD'
$Branch = 'main'

$PluginFile = 'CustomBadges.plugin.js'
$ReadmeSrc  = 'README.md'
$ReadmeDest = 'CustomBadges.README.md'

$SymSec  = [string][char]0x00A7
$SymStep = [string][char]0x25B8
$SymOk   = [string][char]0x25C6
$SymWarn = [string][char]0x25AA
$SymDie  = [string][char]0x2716
$SymEll  = [string][char]0x2026

function Step($m) { Write-Host ""; Write-Host "$SymSec $m" -ForegroundColor Magenta }
function Info($m) { Write-Host "  $SymStep $m" -ForegroundColor Gray }
function Ok($m)   { Write-Host "  $SymOk $m" -ForegroundColor Green }
function Warn($m) { Write-Host "  $SymWarn $m" -ForegroundColor Yellow }
function Die($m)  { Write-Host "  $SymDie $m" -ForegroundColor Red; throw $m }

$SpinFrames = @(0x280B, 0x2819, 0x2839, 0x2838, 0x283C, 0x2834, 0x2826, 0x2827, 0x2807, 0x280F) | ForEach-Object { [string][char]$_ }

function Draw-Spin($frame, $label, $text) {
    try { $w = [Console]::WindowWidth } catch { $w = 80 }
    if ($w -lt 40) { $w = 40 }
    $room = $w - 5 - $label.Length - 3
    if ($room -lt 1) { $text = '' }
    elseif ($text.Length -gt $room) { $text = $text.Substring(0, $room - 1) + $SymEll }
    $tail = if ($text) { " $SymStep $text" } else { '' }
    Write-Host -NoNewline "`r  $frame " -ForegroundColor Magenta
    Write-Host -NoNewline (($label + $tail).PadRight($w - 5)) -ForegroundColor Gray
}

function Clear-Spin {
    try { $w = [Console]::WindowWidth } catch { $w = 80 }
    if ($w -lt 40) { $w = 40 }
    Write-Host -NoNewline ("`r" + (' ' * ($w - 1)) + "`r")
}

$BannerArt = @'
   #########                      #####                             ###########                #####
  ###~~~~~###                    ~~###                             ~~###~~~~~###              ~~###
 ###     ~~~  ##### ####  #####  #######    ######  #############   ~###    ~###  ######    #######   #######  ######   #####
~###         ~~### ~###  ###~~  ~~~###~    ###~~###~~###~~###~~###  ~##########  ~~~~~###  ###~~###  ###~~### ###~~### ###~~
~###          ~### ~### ~~#####   ~###    ~### ~### ~### ~### ~###  ~###~~~~~###  ####### ~### ~### ~### ~###~####### ~~#####
~~###     ### ~### ~###  ~~~~###  ~### ###~### ~### ~### ~### ~###  ~###    ~### ###~~### ~### ~### ~### ~###~###~~~   ~~~~###
 ~~#########  ~~######## ######   ~~##### ~~######  #####~### ##### ########### ~~########~~########~~#######~~######  ######
  ~~~~~~~~~    ~~~~~~~~ ~~~~~~     ~~~~~   ~~~~~~  ~~~~~ ~~~ ~~~~~ ~~~~~~~~~~~   ~~~~~~~~  ~~~~~~~~  ~~~~~### ~~~~~~  ~~~~~~
                                                                                                     ### ~###
                                                                                                    ~~######
                                                                                                     ~~~~~~
'@
$BannerArt = $BannerArt.Replace('#', [string][char]0x2588).Replace('~', [string][char]0x2592)

function Enable-VT {
    try {
        Add-Type -Namespace CB -Name Con -MemberDefinition @'
[DllImport("kernel32.dll")] public static extern IntPtr GetStdHandle(int h);
[DllImport("kernel32.dll")] public static extern bool GetConsoleMode(IntPtr h, out int m);
[DllImport("kernel32.dll")] public static extern bool SetConsoleMode(IntPtr h, int m);
'@
        $h = [CB.Con]::GetStdHandle(-11)
        $m = 0
        if ([CB.Con]::GetConsoleMode($h, [ref]$m)) { return [CB.Con]::SetConsoleMode($h, ($m -bor 4)) }
        return $false
    } catch { return $false }
}

function Get-Blurple($t) {
    $stops = @(@(71, 82, 196), @(88, 101, 242), @(124, 140, 248), @(165, 176, 255))
    $t = [math]::Max(0, [math]::Min(1, $t))
    $s = $t * ($stops.Count - 1)
    $i = [math]::Min([int][math]::Floor($s), $stops.Count - 2)
    $f = $s - $i
    $a = $stops[$i]
    $b = $stops[$i + 1]
    return @(
        [int]($a[0] + ($b[0] - $a[0]) * $f),
        [int]($a[1] + ($b[1] - $a[1]) * $f),
        [int]($a[2] + ($b[2] - $a[2]) * $f)
    )
}

function Show-Banner {
    $lines = @($BannerArt -split "`r?`n" | Where-Object { $_.Length -gt 0 })
    $max = ($lines | Measure-Object -Property Length -Maximum).Maximum
    try { $w = [Console]::WindowWidth } catch { $w = 120 }
    if ($w -lt ($max + 1)) {
        Write-Host "$SymOk CustomBadges" -ForegroundColor Magenta
        return
    }
    if (-not (Enable-VT)) {
        for ($row = 0; $row -lt $lines.Count; $row++) {
            $color = if ($row -lt 7) { 'Blue' } else { 'DarkBlue' }
            Write-Host $lines[$row] -ForegroundColor $color
        }
        return
    }
    $esc = [char]27
    $rows = $lines.Count
    for ($row = 0; $row -lt $rows; $row++) {
        $line = $lines[$row].PadRight($max)
        $sb = New-Object System.Text.StringBuilder
        $lastQ = -1
        for ($c = 0; $c -lt $line.Length; $c++) {
            $ch = $line[$c]
            if ($ch -eq ' ') { [void]$sb.Append(' '); continue }
            $t = ($c / $max) * 0.85 + ($row / $rows) * 0.15
            $q = [int][math]::Round($t * 24)
            if ($q -ne $lastQ) {
                $rgb = Get-Blurple ($q / 24)
                [void]$sb.Append("$esc[38;2;$($rgb[0]);$($rgb[1]);$($rgb[2])m")
                $lastQ = $q
            }
            [void]$sb.Append($ch)
        }
        [void]$sb.Append("$esc[0m")
        Write-Host $sb.ToString()
    }
}

function Download-Files($base, $targets) {
    $wc = New-Object System.Net.WebClient
    $wc.Headers.Add('User-Agent', 'CustomBadgesBD-Installer')
    $sw = [Diagnostics.Stopwatch]::StartNew()
    $total = $targets.Count
    $n = 0
    $i = 0
    try { [Console]::CursorVisible = $false } catch { }
    try {
        foreach ($t in $targets) {
            $n++
            $task = $wc.DownloadFileTaskAsync("$base$($t.Src)", $t.Dest)
            do {
                Draw-Spin $SpinFrames[$i % $SpinFrames.Count] "Downloading ($n/$total)" $t.Src
                $i++
                Start-Sleep -Milliseconds 60
            } while (-not $task.IsCompleted)
            if ($task.IsFaulted -or $task.IsCanceled) {
                Clear-Spin
                $reason = if ($task.Exception) { $task.Exception.GetBaseException().Message } else { 'cancelled' }
                Die "failed to download $($t.Src): $reason"
            }
        }
    } finally {
        try { [Console]::CursorVisible = $true } catch { }
        Clear-Spin
        $wc.Dispose()
    }
    return [math]::Round($sw.Elapsed.TotalSeconds, 1)
}

Write-Host ""
Show-Banner
Write-Host ""
Write-Host "$SymOk CustomBadges installer for BetterDiscord" -ForegroundColor Magenta
Write-Host "  Third-party plugin. Client mods are against Discord's ToS, use at your own risk." -ForegroundColor DarkGray

Step "Locate BetterDiscord"

$candidates = @()
if ($env:CB_BD_DIR) { $candidates += $env:CB_BD_DIR.Trim().Trim('"').TrimEnd('\', '/') }
$candidates += @(
    (Join-Path $env:APPDATA 'BetterDiscord'),
    (Join-Path $env:APPDATA 'betterdiscord'),
    (Join-Path $env:LOCALAPPDATA 'BetterDiscord'),
    (Join-Path $env:USERPROFILE '.config\BetterDiscord')
)

$bdRoot = $null
foreach ($path in $candidates) {
    if ($path -and (Test-Path -LiteralPath $path -PathType Container)) {
        $bdRoot = $path
        break
    }
}

if (-not $bdRoot) {
    Warn "BetterDiscord folder not found."
    Info "install BetterDiscord first: https://betterdiscord.app"
    Info "then start Discord once and run this command again."
    Info "already installed somewhere odd? set `$env:CB_BD_DIR to that folder."
    Die "BetterDiscord folder not found"
}
Ok $bdRoot

$pluginsDir = Join-Path $bdRoot 'plugins'
if (-not (Test-Path -LiteralPath $pluginsDir -PathType Container)) {
    Info "creating plugins folder"
    New-Item -ItemType Directory -Path $pluginsDir -Force | Out-Null
}
Ok "plugins folder: $pluginsDir"

Step "Plugin files"

$pluginDest = Join-Path $pluginsDir $PluginFile
$readmeDest = Join-Path $pluginsDir $ReadmeDest
$updating   = Test-Path -LiteralPath $pluginDest
if ($updating) { Info "existing install found, updating" }

$base = "https://raw.githubusercontent.com/$Owner/$Repo/$Branch/"
$targets = @(
    @{ Src = $PluginFile; Dest = $pluginDest },
    @{ Src = $ReadmeSrc;  Dest = $readmeDest }
)
$secs = Download-Files $base $targets
Ok "Plugin files ($($targets.Count) files, ${secs}s) copied to $pluginsDir"
Info $PluginFile
Info $ReadmeDest

Step "Discord"

$restarted = $false
if ($env:CB_NO_RESTART -eq '1') {
    Info "restart skipped (CB_NO_RESTART=1)"
} else {
    $procs = @(Get-Process -Name 'Discord', 'DiscordPTB', 'DiscordCanary', 'DiscordDevelopment' -ErrorAction SilentlyContinue)
    if ($procs.Count -eq 0) {
        Info "Discord is not running, nothing to restart"
    } else {
        $launch = @()
        foreach ($p in $procs) {
            try {
                $exe = $p.Path
                if ($exe) {
                    $update = Join-Path (Split-Path (Split-Path $exe -Parent) -Parent) 'Update.exe'
                    $entry = @{ Update = $update; Exe = (Split-Path $exe -Leaf) }
                    if ((Test-Path -LiteralPath $update) -and -not ($launch | Where-Object { $_.Update -eq $entry.Update })) {
                        $launch += $entry
                    }
                }
            } catch { }
        }

        Info "closing Discord"
        $procs | Stop-Process -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 2
        Ok "Discord closed"

        if ($launch.Count -gt 0) {
            foreach ($l in $launch) {
                Start-Process -FilePath $l.Update -ArgumentList '--processStart', $l.Exe
            }
            $restarted = $true
            Ok "Discord restarted"
        } else {
            Warn "could not find Update.exe, start Discord manually"
        }
    }
}

Write-Host ""
Write-Host "$SymOk Done." -ForegroundColor Magenta
if ($restarted) {
    Write-Host "  $SymStep Discord was restarted so the plugin loads cleanly." -ForegroundColor Gray
} else {
    Write-Host "  $SymStep Restart Discord (or press Ctrl+R) so BetterDiscord loads the plugin." -ForegroundColor Gray
}
Write-Host "  $SymStep Open Settings > Plugins and enable CustomBadges." -ForegroundColor Gray
Write-Host ""
