---
description: Safe Git Workflow for Deployment
---

This workflow describes how to safely commit changes and prepare for deployment, ensuring you can easily rollback if needed.

1.  **Check Status**: Ensure your working directory is clean or only has the changes you want to commit.
    ```bash
    git status
    ```

2.  **Create a Feature Branch** (Optional but Recommended): It's best to work on a separate branch.
    ```bash
    git checkout -b feature/sidebar-tabs
    ```

3.  **Stage and Commit**: Add your changes and commit them with a descriptive message.
    ```bash
    git add .
    git commit -m "Implement sidebar tabs and info preview"
    ```

4.  **Push Branch**: Push your branch to the remote repository.
    ```bash
    git push -u origin feature/sidebar-tabs
    ```

5.  **Create a Release Tag**: Before deploying, create a tag. This marks a specific point in history that you can always return to.
    ```bash
    git tag -a v1.0.0-sidebar-update -m "Release version 1.0.0 with sidebar tabs"
    git push origin v1.0.0-sidebar-update
    ```

**How to Rollback:**

If you encounter a bug after deployment:

1.  **Checkout the previous tag**:
    ```bash
    git checkout v0.9.0 # Replace with your previous version tag
    ```
    OR
2.  **Revert the commit** (if you merged to main):
    ```bash
    git revert HEAD
    git push origin main
    ```
