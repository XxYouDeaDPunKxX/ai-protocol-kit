# PowerShell WinForms App Generator Protocol v1

Audience: AI agents generating or refactoring PowerShell + WinForms desktop apps.

Purpose: produce operational desktop UIs that are responsive, readable, maintainable, and safe to use under real work. This is a behavior contract, not end-user documentation.

## Priority Tiers (Reading Guide)

This contract has no flat hierarchy by default. When context, time, or output length is constrained, degrade in this order — never the reverse.

**Tier A — non negotiable. Violation causes a crash, a frozen UI, or a wrong-environment launch.**
Sections 0, 2, 3, 5, 6, 7.

**Safety / Integrity — never bypass silently.**
Rules about secrets, destructive actions, privilege elevation, unsupported environments, and test truthfulness are binding regardless of tier. If they cannot be satisfied, stop or ask for user confirmation.

**Tier B — structural. Binding; deviation requires an explicit stated reason in the output.**
Sections 1, 4, 8, 9, 10, 11, 12, 13 core DPI/readability/accessibility baseline, 14, 15, 18.

**Tier C — polish. Best effort; if skipped, say so explicitly.**
Extended accessibility polish in Section 13 when the runtime or environment cannot support implementation or verification.

**Process sections — always active.**
Sections 16, 17, 19, 20. They govern verification, acceptance, rejection, and final output even when lower-tier implementation details are skipped.

If two rules from different tiers conflict, the lower tier yields and the conflict is stated in the output, not silently resolved.

## 0. Target Runtime Matrix

Before generating code, declare the exact target:

- Windows desktop interactive session only;
- Windows PowerShell 5.1, PowerShell 7+, or both;
- expected backing runtime: .NET Framework or modern .NET;
- x64/x86 requirement when COM, native binaries, registry views, ODBC/OLEDB, or shell integration are involved;
- required modules and minimum versions;
- supported launch command;
- unsupported contexts: Linux, macOS, WSL, SSH remoting, WinRM, noninteractive scheduled task, headless CI, unless explicitly handled as static/test-only mode.

The app must fail early with a clear message if the host cannot display a Windows desktop UI.

## 1. Default Stack

Use native PowerShell + WinForms by default.

Do not introduce third-party UI libraries unless the user explicitly asks for them and accepts the dependency cost.

Minimum baseline:

```powershell
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
[System.Windows.Forms.Application]::EnableVisualStyles()
```

## 2. Host And Message Pump

- Use a single UI owner thread.
- Start UI entrypoints with `powershell.exe -STA`, `pwsh.exe -STA`, or an equivalent single-threaded apartment host. Fail early or show a clear warning if the current host is not STA.
- Create controls only on the UI thread.
- Do not start background workers from the form constructor.
- Start workers only after the form handle exists, preferably in `Shown` / `Load` or after the message pump has started.
- Use `Application.Run($form)` or an `ApplicationContext`-equivalent owner pattern.
- Do not use `ShowDialog()` as the normal main-loop strategy unless the tool is explicitly modal and short-lived.
- On shutdown, set a closing flag before disposing controls so late callbacks are ignored.
- If the visible UI process owns the form, do not launch that process hidden. Hidden launch is acceptable only for a helper process that is separate from the visible UI.

## 3. Hard Constraints (Canonical List)

This is the single source of truth for hard constraints. Sections 16 and 19 reference this list instead of restating it; do not treat a constraint as weaker because it only appears here.

- Treat WinForms as event-driven desktop software, not as a quick form script.
- Keep the UI thread responsive.
- Do not perform slow work directly inside click handlers or timer handlers.
- Do not update controls from worker threads without marshaling back to the UI thread.
- Do not build the main UI with fixed coordinates.
- Do not hide operation status, progress, or errors.
- `Application.DoEvents()` may be used only for tiny UI-state flushes. Never use it to mask long synchronous work or as the normal responsiveness strategy.
- Do not use `System.Windows.Forms.Timer`, or any timer type, as a background worker for slow work.
- Do not append unbounded text/log output directly to a control; cap, batch, or page it.
- Do not start workers before the form handle exists.
- Do not leave timers running or disposed-of controls referenced after form closing.
- Do not state that a check, test, or scan was performed if it was not actually executed in this session. If a check was skipped, asserted from reading the code, or not possible in the current environment, label it explicitly as such — never as "verified."
- Prefer stable, boring, operational UI over decorative UI.

## 4. Layout Rules

Use layout containers:

- `TableLayoutPanel` for the main shell and major regions.
- `FlowLayoutPanel` for command bars, filters, status badges, and button groups.
- `SplitContainer` when the user needs adjustable main/detail or content/log regions.
- `Dock` and `Anchor` deliberately.
- Fixed minimum window size.

Avoid:

- deeply nested layout trees;
- rebuilding layout during resize;
- expensive refresh during resize;
- fixed-coordinate-only forms;
- oversized command areas that force scrolling.

For operational dashboards, prefer this shape:

```text
Top command/status area     small fixed height
Main content area           70-80%
Log/status console          20-30%
```

For two-pane content, prefer:

```text
summary/actions/details     38%
main output/list/log        62%
```

## 5. Responsiveness And Dispatcher

An acceptable UI must remain:

- movable;
- clickable where safe;
- repaintable;
- visibly alive during work.

For any operation that can take noticeable time:

1. validate immediately;
2. show a running/loading state;
3. disable only controls that would conflict with the operation;
4. run the work outside the UI thread or keep the synchronous section very short;
5. report progress or current step where practical;
6. write to an app console/log;
7. restore controls and cursor state in `finally`.

Create exactly one UI-safe dispatcher/helper, then route all worker-to-UI updates through it. Do not scatter raw `Invoke` / `BeginInvoke` calls across unrelated business logic.

The helper must:

- ignore updates after shutdown begins;
- ignore disposed or disposing controls;
- avoid forcing handle creation from a worker thread;
- marshal through `BeginInvoke` / `Invoke` only after the handle exists;
- centralize exception handling for UI callbacks;
- be the only allowed path for worker-to-UI updates.

Use `Control.InvokeAsync` only when the declared target runtime supports it. Do not recommend it generically for Windows PowerShell 5.1 / .NET Framework targets.

## 6. Background Execution Strategy

Declare the chosen strategy per app or per action:

- UI-only fast action: run on UI thread only if it is visibly instantaneous.
- I/O wait or external command: prefer background worker, runspace, or helper process with progress callbacks.
- CPU-heavy work: use runspace pool, process isolation, or a bounded thread/job strategy.
- Risky or unstable external calls: prefer helper process isolation over in-process thread jobs.
- Windows PowerShell 5.1 compatibility: do not assume `Start-ThreadJob` exists unless the dependency is declared.
- PowerShell 7+ only: thread jobs or `ForEach-Object -Parallel` may be used only with throttling and UI-safe marshaling.
- Never pass WinForms controls into jobs, runspaces, or thread jobs.
- Every background operation must have cancellation/stop behavior, stale-result protection, and final UI restore.

## 7. Timer Policy

- Use `System.Windows.Forms.Timer` only for UI polling, debouncing, status refresh, and scheduling lightweight checks on the UI thread.
- Do not use `System.Windows.Forms.Timer` for slow work.
- If using `System.Threading.Timer` or `System.Timers.Timer`, treat callbacks as worker-thread callbacks and marshal all UI changes through the dispatcher.
- Prevent overlapping ticks with an `isRunning` flag, lock, cancellation token, or operation sequence id.
- Stop and dispose all timers on form closing.

## 8. Application State

Use one explicit application state object.

Minimum state:

- `IsClosing`;
- current operation id or sequence id;
- refresh/action in-progress flags;
- cancellation/stop flags;
- current config;
- last refresh time;
- log path;
- selected item or current context.

Worker callbacks must verify that:

- the form is not closing;
- the operation id is still current;
- target controls still exist;
- the result is not stale.

## 9. Actions, Errors, And Destructive Operations

A button click handler should not contain business logic.

Preferred shape:

```text
click
-> set UI status
-> call action wrapper
-> action wrapper runs work
-> update view
-> log outcome
```

Every command should have:

- visible start state;
- visible completion or failure state;
- error path;
- log entry.

PowerShell error discipline:

- action wrappers must use terminating-error discipline;
- for cmdlets that may emit non-terminating errors, use `-ErrorAction Stop` or scoped `$ErrorActionPreference = 'Stop'`;
- do not rely on `$?`, `Write-Error`, or console output as the only failure signal;
- catch blocks must log both user-readable message and technical `ErrorRecord` / exception details;
- `finally` must restore cursor, controls, running flags, and cancellation state.

Privileged and destructive actions:

These are safety/integrity rules. Do not bypass them silently or treat them as cosmetic.

- do not request elevation unless the specific action requires it;
- detect missing privileges and explain the required permission;
- never silently self-elevate;
- destructive actions must expose target, scope, consequence, and confirmation;
- prefer dry-run / preview for delete, overwrite, stop service, kill process, registry, ACL, network, or bulk file actions;
- logs must record destructive action intent and result without leaking secrets.

## 10. Logging And Status

Every operational app needs a visible app console or status log.

Minimum log behavior:

- timestamped entries;
- action started;
- action completed;
- action failed;
- short user-readable message;
- technical details in a file log when useful.

Do not append thousands of log lines directly to the UI one by one. Batch or cap log output when volume can be high.

Keep a status area visible for:

- idle/running/error state;
- last refresh time;
- connected/disconnected state where relevant;
- current action.

Log and UI text must redact secrets, tokens, passwords, API keys, OAuth credentials, and private config values by default.

## 11. Loading And Refresh

Do not autoload heavy data before the form is shown.

Safe startup:

```text
create form
show form
display "Ready"
load data only after explicit refresh or lightweight shown event
```

Autorefresh must be:

- off by default unless the user asked otherwise;
- toggleable;
- skipped while another refresh is running;
- bounded by a reasonable interval;
- logged.

For multi-tab dashboards, failure in one panel must not break all panels. Render the failing panel as unavailable and keep the rest working.

## 12. Data Volume Controls

- Use `DataGridView` only with bounded row counts, paging, lazy loading, or `VirtualMode` for large datasets.
- Avoid expensive autosizing modes on large grids.
- Do not repopulate entire grids on every timer tick or resize.
- Preserve selection and scroll position where practical.
- For logs, cap visible lines and write full detail to file.
- Batch UI updates with `BeginUpdate` / `EndUpdate` where supported.
- Large lists, logs, and trees must be capped, paged, lazy-loaded, virtualized, or searchable.

## 13. DPI And Accessibility

Core DPI, readability, and accessibility baseline is Tier B. Environment-dependent validation and extended accessibility polish are Tier C only when they cannot be implemented or verified in the current runtime. Skipped items must be stated explicitly.

Use:

- Segoe UI or system UI font;
- consistent spacing;
- restrained colors;
- clear disabled, running, success, warning, and error states;
- readable contrast;
- compact command bars;
- no decorative elements that hide operational state.

Configure DPI behavior before creating controls whenever the runtime supports it.

For .NET Framework targets, declare whether app config or manifest DPI settings are available. For script-only PowerShell apps where app config is not practical, state the limitation and still design with `AutoScaleMode`, layout containers, minimum sizes, and DPI smoke tests.

Never satisfy DPI requirements only by testing fullscreen. Test at 125% and 150% scaling when possible.

Minimum accessibility baseline:

- predictable tab order;
- keyboard-reachable primary commands;
- tooltips for unclear actions;
- no color-only status communication;
- readable disabled and focused states;
- `AccessibleName` / `AccessibleDescription` for non-textual controls;
- mnemonic `&` markers for primary menu/buttons where appropriate;
- default and cancel buttons when the form has a clear primary/cancel action;
- focus management after errors, refresh, and modal prompts;
- high-contrast usability.

## 14. Launch And Packaging

Every app must include a documented launch command.

Minimum:

- executable: `powershell.exe` or `pwsh.exe`;
- `-NoProfile`;
- `-STA` on Windows;
- `-File` with an absolute or script-root-safe path;
- working directory behavior;
- module dependency check;
- log directory behavior;
- whether `ExecutionPolicy` override is used and why.

Do not use hidden launch for the visible UI process.

## 15. Code Organization

Avoid one giant script when the app is expected to grow.

For small single-file tools, separate code into regions/functions:

- bootstrap;
- config/state;
- UI helpers;
- layout construction;
- actions;
- background work;
- logging;
- event binding.

For larger apps, prefer files like:

```text
App.ps1
ui/
  MainForm.ps1
  Controls.ps1
  Layout.ps1
  Theme.ps1
core/
  State.ps1
  Actions.ps1
  Jobs.ps1
  Logging.ps1
```

Keep UI construction separate from slow work and domain logic.

On form closing:

- stop timers;
- cancel pending workers when possible;
- ignore late worker callbacks after shutdown begins;
- flush file logs;
- dispose disposable UI, process, filesystem, and timer resources;
- avoid leaving helper processes running unless the user explicitly asked for that.

## 16. Verification, Static Scans, And Smoke Tests

Smoke testing is mandatory when the environment can support it.

Minimum smoke test for a local Windows desktop UI:

1. launch the app from its documented command;
2. verify the window opens quickly and is visible;
3. resize the window smaller than fullscreen;
4. click refresh or the main safe action;
5. trigger one slow or failing action if available;
6. confirm the UI remains movable and repaintable during work;
7. confirm logs/status update;
8. close the app cleanly.

If the agent is running in a limited environment such as a remote Linux workspace, `/mnt` extraction, CI, or a headless sandbox, it must still run the strongest available checks:

- syntax/parser checks;
- static scans;
- dry runs that do not require a desktop;
- headless tests when the stack supports them;
- launch checks only when a GUI is actually available.

When full smoke testing is not possible, the agent must state exactly which checks were run and which checks were not possible in that environment. Do not imply that a desktop UI was visually verified when it was only statically inspected.

Before claiming completion, scan for:

- `Start-Sleep` in UI handlers;
- long business logic directly in click/tick handlers;
- `Application.DoEvents()` in loops;
- direct control updates from jobs/runspaces/thread callbacks;
- `catch` blocks that hide errors;
- `-ErrorAction SilentlyContinue` without explicit justification;
- unbounded `AppendText` / `Controls.Add` loops;
- timers not stopped/disposed;
- workers started before handle creation;
- missing form-closing cleanup.

## 17. Acceptance Checklist

A generated or refactored app is acceptable only if:

- target runtime matrix is declared;
- the window opens quickly;
- the UI can be moved while work runs;
- controls do not require fullscreen to be usable;
- resizing does not visibly freeze the app;
- command areas do not force horizontal scrolling;
- logs/status explain what the app is doing;
- long work has visible progress or running state;
- errors are visible and recoverable;
- no unsafe cross-thread control updates are used;
- large lists/logs are capped, paged, lazy, or batched;
- app state, cancellation, and stale callback handling are explicit;
- the app remains usable at 125% and 150% DPI;
- required smoke tests were run, or unavailable checks were explicitly listed.

## 18. Complexity Escalation

PowerShell + WinForms is acceptable for operational tools, dashboards, admin consoles, and internal utilities.

If the app requires multi-window navigation, complex state, heavy data binding, plugin architecture, installer/updater, enterprise accessibility, or long-term product maintenance, the agent must flag the complexity and propose alternatives:

- keep PowerShell core with a compiled C# WinForms shell;
- WPF / WinUI for richer Windows UI;
- web/local dashboard if cross-platform or remote access matters.

Do not switch stack without user approval.

## 19. Anti-Patterns

Reject or rewrite:

- fixed-coordinate-only forms;
- giant top areas full of oversized buttons;
- blocking click handlers;
- hidden errors;
- silent failures;
- autorefresh that cannot be disabled;
- updating controls from worker threads;
- refreshing heavy data on resize;
- huge unbounded text/log updates;
- worker callbacks that can update disposed controls;
- `InvokeRequired` checks before handle creation without a safe dispatcher;
- timers used as background workers;
- introducing UI libraries before native WinForms has been proven insufficient;
- claiming a UI was tested when only syntax/static checks were performed.

## 20. AI Output Requirements

When proposing or generating a PowerShell + WinForms app, include:

- chosen architecture;
- target runtime matrix;
- file layout if more than one file is used;
- changed files when modifying an existing app;
- changed behavior;
- entrypoint and run command;
- background/async strategy;
- UI dispatcher strategy;
- logging path and redaction behavior;
- known limitations;
- exact checks run;
- exact checks skipped and why;
- smoke test results, including any skipped checks and why they were skipped;
- residual risks;
- manual smoke checklist still required.

Do not include environment-specific tool instructions, connector names, private paths, or session-specific metadata in the generated contract or app.
