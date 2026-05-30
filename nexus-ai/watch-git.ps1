$ErrorActionPreference = 'Stop'

# Function to check for changes and push
function Push-If-Changed {
    # Check if there are any staged or unstaged changes
    git diff-index --quiet HEAD --
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Changes detected. Adding, committing, and pushing..."
        git add .
        $timestamp = Get-Date -Format "yyyy-MM-ddTHH:mm:sszzz"
        git commit -m "Auto-commit: $timestamp"
        git push
    } else {
        Write-Host "No changes detected."
    }
}

# Initial push in case repository is fresh
Push-If-Changed

# Watcher loop – poll every 20 seconds
while ($true) {
    Start-Sleep -Seconds 5
    Push-If-Changed
}
