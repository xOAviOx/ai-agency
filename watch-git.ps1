$ErrorActionPreference = "Continue"

Write-Host "==========================================================" -ForegroundColor Cyan
Write-Host "     Git Auto-Push Watcher Activated                      " -ForegroundColor Cyan
Write-Host "     Watching: c:\Users\avish\OneDrive\Desktop\Ai-agency " -ForegroundColor Cyan
Write-Host "     Target Remote: origin/main                          " -ForegroundColor Cyan
Write-Host "     Press Ctrl+C to stop watching.                       " -ForegroundColor Cyan
Write-Host "==========================================================" -ForegroundColor Cyan

while ($true) {
    # Check for changes (tracked modified, deleted, and untracked files)
    $status = git status --porcelain
    if ($status) {
        Write-Host ""
        Write-Host "=========================================" -ForegroundColor Yellow
        Write-Host "$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss') - Changes detected!" -ForegroundColor Yellow
        Write-Host "=========================================" -ForegroundColor Yellow
        Write-Host $status
        Write-Host "-----------------------------------------" -ForegroundColor Yellow
        
        # Get brief list of changed files for a cleaner commit message
        $changedFiles = @()
        foreach ($line in ($status -split "`n")) {
            if ($line.Trim() -ne "") {
                # Format: "M path/to/file" or "?? path/to/file"
                $parts = $line.Trim() -split "\s+", 2
                if ($parts.Count -eq 2) {
                    $file = $parts[1]
                    # Get just the filename or relative path
                    $changedFiles += $file
                }
            }
        }
        
        $filesStr = $changedFiles -join ", "
        if ($filesStr.Length -gt 60) {
            $filesStr = $filesStr.Substring(0, 57) + "..."
        }
        
        $commitMsg = "Auto-push: $filesStr"
        if ([string]::IsNullOrWhiteSpace($filesStr)) {
            $commitMsg = "Auto-push: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
        }

        # Stage changes
        Write-Host "Staging changes..." -ForegroundColor Gray
        git add .
        
        # Commit
        Write-Host "Committing with message: '$commitMsg'..." -ForegroundColor Gray
        git commit -m $commitMsg
        
        # Try to pull with rebase first in case of remote changes
        Write-Host "Checking for remote updates (git pull --rebase)..." -ForegroundColor Gray
        git pull --rebase origin main
        
        # Push to remote
        Write-Host "Pushing to origin main..." -ForegroundColor Green
        git push origin main
        
        Write-Host "Push complete. Resuming watch..." -ForegroundColor Cyan
    }
    
    Start-Sleep -Seconds 3
}
