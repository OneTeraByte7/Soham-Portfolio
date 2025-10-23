Add-Type -AssemblyName System.IO.Compression.FileSystem
$docxPath = "F:\Soham Portfolio\client\Soham_SDE_2025.docx"
$zip = [System.IO.Compression.ZipFile]::OpenRead($docxPath)
$entry = $zip.GetEntry('word/document.xml')
$stream = $entry.Open()
$reader = New-Object System.IO.StreamReader($stream)
$content = $reader.ReadToEnd()
$reader.Close()
$stream.Close()
$zip.Dispose()
$text = $content -replace '<[^>]+>', ' ' -replace '\s+', ' '
Write-Output $text
