# Issues Report

This report lists issues found in the current project state. No application code was changed while creating this file.

## Issues

1. Missing profile detail data for many search results
   - The search datasets contain many accounts, but the project only includes a small set of profile JSON files under the profiles folder.
   - Verification: a data check found 24 usernames from the search data that do not have matching profile JSON files.
   - Impact: clicking some profiles can lead to a "Profile not found" state even though the item appears in search results.

2. Profile detail loading has no error handling
   - The profile loader is called inside an effect, but the promise chain does not handle failures or rejected requests.
   - Impact: a failed or missing profile load can leave the UI in an inconsistent loading state instead of showing a clear fallback message.

3. The detail page ignores the platform context for data loading
   - The route reads a platform value from the query string, but the actual profile data is loaded only by username.
   - Impact: the UI can display one platform while the profile data is being loaded independently, which makes the behavior harder to reason about and could cause mismatches.

4. The profile list passes a dead callback prop
   - The ProfileList component accepts an onProfileClick prop, but the current implementation does not use it and handles navigation inside the card component instead.
   - Impact: this is a maintenance smell and can confuse future changes because the prop appears to be part of the flow but does nothing.

5. The app depends on a very small static dataset
   - Profile information is loaded from static JSON files, and the available set of detail pages is much smaller than the search results set.
   - Impact: the experience feels incomplete for many profiles and makes the app appear inconsistent.
