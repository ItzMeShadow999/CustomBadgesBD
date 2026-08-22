/**
 * @name CustomBadges
 * @author ItzMeShadow999
 * @description Adds a self-hosted custom badge with a hover tooltip to user profiles, visible to anyone else running this plugin. Ported from the Vencord CustomBadges plugin to the BetterDiscord API.
 * @version 1.0.4
 * @website https://github.com/ItzMeShadow999/CustomBadges
 * @source https://github.com/ItzMeShadow999/CustomBadges/blob/CustomBadges-React
 */

const __cbModules = {};
function __cbDefine(id, factory) { __cbModules[id] = { factory, exports: null }; }
function __cbRequire(id) {
    const key = id.replace(/^\.\//, "").replace(/^@/, "@");
    const mod = __cbModules[key];
    if (!mod) throw new Error("[CustomBadges Dashboard] module not found: " + id);
    if (!mod.exports) {
        mod.exports = {};
        if (mod.factory) mod.factory(mod.exports, __cbRequire);
    }
    return mod.exports;
}

__cbDefine("types", function (exports, require) {
    exports.state = void 0;
    exports.setDashboardActive = setDashboardActive;
    exports.state = {
        isDashboardActive: false
    };
    function setDashboardActive(active) {
        exports.state.isDashboardActive = active;
    }

});

__cbDefine("html", function (exports, require) {
    exports.buttonHtml = buttonHtml;
    exports.headerBarHtml = headerBarHtml;
    exports.dashboardHtml = dashboardHtml;
    function buttonHtml(label = "User Dashboard", iconSvg, isSelected = false) {
        const activeBg = isSelected ? "background:rgba(88,101,242,0.2);color:#fff;" : "background:transparent;color:var(--interactive-normal,#b5bac1);";
        const defaultIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="flex-shrink:0;"><path d="M4 13h6a1 1 0 001-1V4a1 1 0 00-1-1H4a1 1 0 00-1 1v8a1 1 0 001 1zm1-8h4v6H5V5zm9 16h6a1 1 0 001-1v-8a1 1 0 00-1-1h-6a1 1 0 00-1 1v8a1 1 0 001 1zm1-8h4v6h-4v-6zM4 21h6a1 1 0 001-1v-4a1 1 0 00-1-1H4a1 1 0 00-1 1v4a1 1 0 001 1zm1-4h4v2H5v-2zm9-8h6a1 1 0 001-1V4a1 1 0 00-1-1h-6a1 1 0 00-1 1v4a1 1 0 001 1zm1-4h4v2h-4V5z"/></svg>`;
        return `<div class="cb-dash-btn-inner" style="display:flex;align-items:center;gap:12px;padding:2px 8px;border-radius:4px;cursor:pointer;height:42px;width:100%;${activeBg}transition:background 0.1s,color 0.1s;font-family:var(--font-primary,'gg sans','Noto Sans',sans-serif);font-size:16px;font-weight:500;user-select:none;">${iconSvg || defaultIcon}<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${label}</span></div>`;
    }
    function headerBarHtml() {
        return `
            <section style="background:#000;border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;display:flex;align-items:center;height:48px;padding:0 16px;font-family:'gg sans','Noto Sans','Helvetica Neue',Helvetica,Arial,sans-serif;">
                <svg aria-hidden="true" width="20" height="20" fill="none" viewBox="0 0 24 24" style="color:#949BA4;flex-shrink:0;margin-right:12px;">
                    <path fill="currentColor" d="M4 13h6a1 1 0 001-1V4a1 1 0 00-1-1H4a1 1 0 00-1 1v8a1 1 0 001 1zm1-8h4v6H5V5zm9 16h6a1 1 0 001-1v-8a1 1 0 00-1-1h-6a1 1 0 00-1 1v8a1 1 0 001 1zm1-8h4v6h-4v-6zM4 21h6a1 1 0 001-1v-4a1 1 0 00-1-1H4a1 1 0 00-1 1v4a1 1 0 001 1zm1-4h4v2H5v-2zm9-8h6a1 1 0 001-1V4a1 1 0 00-1-1h-6a1 1 0 00-1 1v4a1 1 0 001 1zm1-4h4v2h-4V5z"/>
                </svg>
                <div id="ub-tabs-container" role="tablist" style="display:flex;align-items:stretch;height:100%;">
                    <div class="ub-dash-tab" id="ub-tab-badges" role="tab" tabindex="0" aria-selected="true" data-tab="badges"
                         style="display:flex;align-items:center;padding:0 16px;cursor:pointer;border-bottom:2px solid #5865F2;color:#fff;font-size:15px;font-weight:600;">
                        Custom Badges
                    </div>
                    <div class="ub-dash-tab" id="ub-tab-style" role="tab" tabindex="0" aria-selected="false" data-tab="style"
                         style="display:flex;align-items:center;padding:0 16px;cursor:pointer;border-bottom:2px solid transparent;color:#949BA4;font-size:15px;font-weight:500;">
                        Style Studio
                    </div>
                </div>
                <div id="ub-dash-close" role="button" aria-label="Close Dashboard" tabindex="0"
                     style="margin-left:auto;display:flex;align-items:center;justify-content:center;width:32px;height:32px;border-radius:4px;cursor:pointer;color:#949BA4;flex-shrink:0;">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="6" y1="6" x2="18" y2="18"/><line x1="18" y1="6" x2="6" y2="18"/></svg>
                </div>
            </section>
        `;
    }
    function dashboardHtml(presetLabels = []) {
        const icon = {
            toggle: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="10" rx="5"/><circle cx="15.5" cy="12" r="2.75" fill="currentColor" stroke="none"/></svg>`,
            pencil: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 19.5l1-4L16 5l3 3-10.5 10.5-4 1z"/><path d="M14 6.5l3 3"/></svg>`,
            eye: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c2.5-4.2 6.2-6.5 10-6.5s7.5 2.3 10 6.5c-2.5 4.2-6.2 6.5-10 6.5S4.5 16.2 2 12z"/><circle cx="12" cy="12" r="2.75"/></svg>`,
            bolt: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="2 6 8 12 2 18"/><polyline points="9 6 15 12 9 18"/><polyline points="16 6 22 12 16 18"/></svg>`,
            grid: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></svg>`,
            box: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L20 6.5V15.5L12 20L4 15.5V6.5L12 2Z"/><path d="M12 2V11M12 11L20 6.5M12 11L4 6.5"/><path d="M14.5 5L14.5 9L17.5 7.5L17.5 3.7Z"/><path d="M6 13.2l3.4 1.7M6 15l2.6 1.3"/></svg>`,
            check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
            trash: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>`,
            plus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
            shield: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/><polyline points="9 12 11 14 15 10"/></svg>`
        };
        return `
            <style>
            
                #ub-dashboard-settings {
                    --ub-bg: #000000;
                    --ub-bg-card: #050505;
                    --ub-bg-card-hover: #0a0a0a;
                    --ub-bg-input: #0a0a0a;
                    --ub-bg-input-hover: #0f0f0f;
                    --ub-border: rgba(255, 255, 255, 0.06);
                    --ub-border-strong: rgba(255, 255, 255, 0.10);
                    --ub-text: #F2F3F5;
                    --ub-text-secondary: #DBDEE1;
                    --ub-text-muted: #B5BAC1;
                    --ub-text-faint: #949BA4;
                    --ub-accent: #5865F2;
                    --ub-accent-2: #7289DA;
                    --ub-accent-hover: #4752C4;
                    --ub-accent-soft: rgba(88, 101, 242, 0.15);
                    --ub-danger: #DA373C;
                    --ub-positive: #23A55A;
                    --ub-warning: #F0B232;
                    --ub-radius-lg: 12px;
                    --ub-radius: 8px;
                    --ub-radius-sm: 6px;
                    --ub-font: "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;

                    background-color: var(--ub-bg);
                    color: var(--ub-text);
                    font-family: var(--ub-font);
                    font-size: 16px;
                    line-height: 1.5;
                    -webkit-font-smoothing: antialiased;
                }

                #ub-dashboard-settings * {
                    font-family: var(--ub-font);
                    box-sizing: border-box;
                }

                #ub-dashboard-settings .ub-section {
                    background: var(--ub-bg-card);
                    border: 1px solid var(--ub-border);
                    border-radius: var(--ub-radius-lg);
                    padding: 20px;
                    margin-bottom: 16px;
                    transition: border-color 150ms ease, background-color 150ms ease;
                }

                #ub-dashboard-settings .ub-section:hover {
                    border-color: var(--ub-border-strong);
                }

                #ub-dashboard-settings .ub-section-head {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 16px;
                    padding-left: 10px;
                    border-left: 2px solid var(--ub-accent-2);
                }

                #ub-dashboard-settings .ub-section-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 20px;
                    height: 20px;
                    color: var(--ub-accent-2);
                    flex-shrink: 0;
                    opacity: 0.9;
                }

                #ub-dashboard-settings .ub-eyebrow {
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.03em;
                    text-transform: uppercase;
                    color: var(--ub-text-muted);
                }

                #ub-dashboard-settings .ub-section-title {
                    font-size: 16px;
                    font-weight: 600;
                    color: var(--ub-text);
                    margin: 0;
                }

                #ub-dashboard-settings .ub-field {
                    margin-bottom: 16px;
                }

                #ub-dashboard-settings .ub-field:last-child {
                    margin-bottom: 0;
                }

                #ub-dashboard-settings .ub-label {
                    display: block;
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0.02em;
                    text-transform: uppercase;
                    color: var(--ub-text-muted);
                    margin-bottom: 8px;
                }

                #ub-dashboard-settings .ub-hint {
                    font-size: 14px;
                    line-height: 1.5;
                    color: var(--ub-text-faint);
                    margin: 0 0 14px;
                }

                #ub-dashboard-settings .ub-input,
                #ub-dashboard-settings .ub-select {
                    width: 100%;
                    background: rgba(255, 255, 255, 0.04);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.10);
                    border-top-color: rgba(255, 255, 255, 0.16);
                    border-radius: var(--ub-radius-sm);
                    padding: 10px 12px;
                    min-height: 40px;
                    color: var(--ub-text);
                    font-size: 14px;
                    font-weight: 400;
                    box-shadow:
                        inset 0 1px 0 rgba(255, 255, 255, 0.07),
                        0 2px 8px rgba(0, 0, 0, 0.35);
                    transition: border-color 150ms ease, background 150ms ease, box-shadow 150ms ease;
                }

                #ub-dashboard-settings .ub-input::placeholder {
                    color: var(--ub-text-faint);
                }

                #ub-dashboard-settings .ub-input:hover,
                #ub-dashboard-settings .ub-select:hover {
                    background: rgba(255, 255, 255, 0.07);
                    border-color: rgba(255, 255, 255, 0.18);
                    border-top-color: rgba(255, 255, 255, 0.24);
                    box-shadow:
                        inset 0 1px 0 rgba(255, 255, 255, 0.10),
                        0 2px 12px rgba(0, 0, 0, 0.4);
                }

                #ub-dashboard-settings .ub-input:focus-visible,
                #ub-dashboard-settings .ub-select:focus-visible {
                    outline: none;
                    background: rgba(255, 255, 255, 0.06);
                    border-color: rgba(88, 101, 242, 0.6);
                    border-top-color: rgba(88, 101, 242, 0.8);
                    box-shadow:
                        inset 0 1px 0 rgba(255, 255, 255, 0.08),
                        0 0 0 3px rgba(88, 101, 242, 0.18),
                        0 2px 12px rgba(0, 0, 0, 0.4);
                }

                #ub-dashboard-settings .ub-select {
                    cursor: pointer;
                    appearance: none;
                    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%23949ba4' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>");
                    background-repeat: no-repeat;
                    background-position: right 12px center;
                    padding-right: 36px;
                }

                #ub-dashboard-settings .ub-btn {
                    appearance: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    border: none;
                    border-radius: var(--ub-radius-sm);
                    padding: 0 16px;
                    min-height: 38px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    color: var(--ub-text-secondary);
                    background: #101010;
                    border: 1px solid var(--ub-border-strong);
                    transition: background-color 120ms ease, border-color 120ms ease, transform 80ms ease, color 120ms ease;
                }

                #ub-dashboard-settings .ub-btn:hover {
                    background: #161616;
                    border-color: rgba(255, 255, 255, 0.2);
                    color: var(--ub-text);
                }

                #ub-dashboard-settings .ub-btn:active {
                    transform: scale(0.97);
                }

                #ub-dashboard-settings .ub-btn:focus-visible {
                    outline: none;
                    box-shadow: 0 0 0 3px var(--ub-accent-soft);
                    border-color: var(--ub-accent);
                }

                #ub-dashboard-settings .ub-btn-primary {
                    background: var(--ub-accent);
                    border-color: var(--ub-accent);
                    color: #ffffff;
                }

                #ub-dashboard-settings .ub-btn-primary:hover {
                    background: var(--ub-accent-hover);
                    border-color: var(--ub-accent-hover);
                    color: #ffffff;
                }

                #ub-dashboard-settings .ub-btn-danger {
                    background: transparent;
                    border-color: var(--ub-border-strong);
                    color: var(--ub-danger);
                }

                #ub-dashboard-settings .ub-btn-danger:hover {
                    background: rgba(218, 55, 60, 0.12);
                    border-color: var(--ub-danger);
                    color: #ff5c60;
                }

                #ub-dashboard-settings .ub-btn-danger-solid {
                    background: var(--ub-danger);
                    border-color: var(--ub-danger);
                    color: #ffffff;
                }

                #ub-dashboard-settings .ub-btn-danger-solid:hover {
                    background: #c42f33;
                    border-color: #c42f33;
                    color: #ffffff;
                }

                #ub-dashboard-settings .ub-btn-danger-solid:disabled {
                    opacity: 0.5;
                    cursor: default;
                }

                #ub-dashboard-settings .ub-btn-row {
                    display: flex;
                    flex-wrap: wrap;
                    align-items: center;
                    gap: 8px;
                    margin-bottom: 16px;
                }

                #ub-dashboard-settings .ub-btn-link {
                    appearance: none;
                    background: none;
                    border: none;
                    padding: 0 4px;
                    min-height: 38px;
                    font-size: 13px;
                    font-weight: 600;
                    color: var(--ub-accent-2);
                    cursor: pointer;
                    transition: color 120ms ease;
                }

                #ub-dashboard-settings .ub-btn-link:hover {
                    color: var(--ub-accent);
                    text-decoration: underline;
                }

                #ub-dashboard-settings .ub-btn-link:focus-visible {
                    outline: none;
                    text-decoration: underline;
                }

            
                #ub-dashboard-settings .ub-token-wrap {
                    position: relative;
                }

                #ub-dashboard-settings .ub-token-wrap input#ub-session-token::selection {
                    color: transparent;
                    background: var(--ub-accent-soft);
                }

                #ub-dashboard-settings .ub-token-wrap input#ub-session-token {
                    color: transparent;
                    caret-color: var(--ub-text);
                
                    height: 40px;
                    padding-top: 0;
                    padding-bottom: 0;
                
                    font-family: var(--font-code, Consolas, "Courier New", monospace);
                    font-size: 14px;
                    letter-spacing: 0;
                }

                #ub-dashboard-settings .ub-token-wrap input#ub-session-token.ub-token-empty {
                    color: var(--ub-text-faint);
                }

                #ub-dashboard-settings .ub-token-overlay {
                    position: absolute;
                    inset: 0;
                    height: 40px;
                
                    border: 1px solid transparent;
                    padding: 0 12px;
                    pointer-events: none;
                    overflow: hidden;
                    font-family: var(--font-code, Consolas, "Courier New", monospace);
                    font-size: 14px;
                    line-height: 1;
                    letter-spacing: 0;
                }

                #ub-dashboard-settings .ub-token-overlay-inner {
                    display: block;
                    height: 40px;
                    line-height: 40px;
                    white-space: nowrap;
                    overflow-wrap: normal;
                    word-break: keep-all;
                    word-wrap: normal;
                
                }

                #ub-dashboard-settings .ub-token-overlay,
                #ub-dashboard-settings .ub-token-overlay * {
                    font-family: var(--font-code, Consolas, "Courier New", monospace);
                }

                #ub-dashboard-settings .ub-token-char {
                    position: relative;
                    display: inline-block;
                    vertical-align: middle;
                    white-space: nowrap;
                    overflow-wrap: normal;
                    word-break: keep-all;
                    word-wrap: normal;
                
                    width: 1ch;
                    height: 1em;
                    line-height: 1;
                    text-align: center;
                }

                #ub-dashboard-settings .ub-token-glyph {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 240ms ease, transform 240ms cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                #ub-dashboard-settings .ub-token-glyph-letter {
                    transform: translateY(-8px) scale(0.3) rotate(-20deg);
                }

                #ub-dashboard-settings .ub-token-glyph-dot {
                    transform: translateY(8px) scale(0.3) rotate(20deg);
                }

                #ub-dashboard-settings .ub-token-glyph.ub-token-shown {
                    opacity: 1;
                    transform: translateY(0) scale(1) rotate(0deg);
                }

            
                #ub-guidelines-backdrop {
                    display: none;
                    position: fixed;
                    inset: 0;
                    z-index: 9998;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(3px);
                    -webkit-backdrop-filter: blur(3px);
                    opacity: 0;
                    transition: opacity 260ms ease;
                    pointer-events: none;
                }

                #ub-guidelines-backdrop.ub-backdrop-open {
                    display: block;
                    opacity: 1;
                    pointer-events: auto;
                }

            
            
                .ub-guidelines-panel {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%) scale(0.94);
                    width: 500px;
                    max-width: 92vw;
                    max-height: 84vh;
                    z-index: 9999;
                    background: #111214;
                    border: 1px solid rgba(255,255,255,0.10);
                    border-radius: 14px;
                    box-shadow:
                        0 0 0 1px rgba(255,255,255,0.04),
                        0 8px 16px rgba(0,0,0,0.4),
                        0 24px 56px rgba(0,0,0,0.7);
                    display: flex;
                    flex-direction: column;
                    padding: 28px 32px 32px;
                    color: #F2F3F5;
                    font-size: 14px;
                    font-family: "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
                    line-height: 1.6;
                    overflow-y: auto;
                    opacity: 0;
                    transform-origin: center center;
                    pointer-events: none;
                    scrollbar-width: thin;
                    scrollbar-color: #4a4a50 #1a1a1d;
                    box-sizing: border-box;
                }

                .ub-guidelines-panel * {
                    box-sizing: border-box;
                    font-family: "gg sans", "Noto Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
                }

                .ub-guidelines-panel::-webkit-scrollbar {
                    width: 10px;
                }

                .ub-guidelines-panel::-webkit-scrollbar-track {
                    background: #1a1a1d;
                    border-radius: 8px;
                }

                .ub-guidelines-panel::-webkit-scrollbar-thumb {
                    background: #4a4a50;
                    border-radius: 8px;
                    border: 2px solid #1a1a1d;
                }

                .ub-guidelines-panel::-webkit-scrollbar-thumb:hover {
                    background: #5c5c63;
                }

                .ub-guidelines-panel.ub-panel-open {
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                    pointer-events: auto;
                    transition: transform 320ms cubic-bezier(0.16, 1, 0.3, 1), opacity 260ms ease-out;
                }

                .ub-guidelines-panel.ub-panel-closing {
                    pointer-events: none;
                    animation: ub-crt-off 340ms cubic-bezier(0.86, 0, 0.07, 1) forwards;
                }

                .ub-guidelines-panel.ub-panel-closing::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: #fff;
                    opacity: 0;
                    pointer-events: none;
                    animation: ub-crt-flash 340ms ease-in forwards;
                }

                @keyframes ub-crt-off {
                    0% { transform: translate(-50%, -50%) scaleY(1) scaleX(1); filter: brightness(1); opacity: 1; }
                    45% { transform: translate(-50%, -50%) scaleY(0.015) scaleX(1); filter: brightness(2.2); opacity: 1; }
                    70% { transform: translate(-50%, -50%) scaleY(0.015) scaleX(0.02); filter: brightness(2.6); opacity: 0.6; }
                    100% { transform: translate(-50%, -50%) scaleY(0.015) scaleX(0.0001); filter: brightness(3); opacity: 0; }
                }

                @keyframes ub-crt-flash {
                    0% { opacity: 0; }
                    35% { opacity: 0.55; }
                    55% { opacity: 0.15; }
                    100% { opacity: 0; }
                }

                .ub-guidelines-close {
                    position: absolute;
                    top: 14px;
                    right: 18px;
                    background: none;
                    border: none;
                    color: #949BA4;
                    font-size: 20px;
                    cursor: pointer;
                    line-height: 1;
                    z-index: 1;
                }

                .ub-guidelines-close:hover {
                    color: #F2F3F5;
                }

                .ub-guidelines-h2 {
                    font-size: 20px;
                    font-weight: 800;
                    margin-bottom: 10px;
                    color: #F2F3F5;
                    letter-spacing: -0.01em;
                    line-height: 1.3;
                }

                .ub-guidelines-h3 {
                    font-size: 15px;
                    font-weight: 700;
                    margin: 18px 0 6px;
                    color: #F2F3F5;
                }

                .ub-guidelines-code {
                    display: block;
                    background: #0a0a0a;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 6px;
                    padding: 14px 16px;
                    font-family: "Consolas", "Menlo", "Courier New", monospace;
                    font-size: 13px;
                    line-height: 1.65;
                    white-space: pre;
                    overflow-x: auto;
                    margin: 8px 0;
                }

                .ub-guidelines-code .k { color: #9cdcfe; }
                .ub-guidelines-code .s { color: #ce9178; }
                .ub-guidelines-code .n { color: #b5cea8; }
                .ub-guidelines-code .p { color: #808080; }

                .ub-guidelines-inline-code {
                    background: #0a0a0a;
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 4px;
                    padding: 1px 5px;
                    font-family: "Consolas", "Menlo", "Courier New", monospace;
                    font-size: 12px;
                    color: #ce9178;
                }

                .ub-guidelines-note {
                    background: #0f0f0f;
                    border-radius: 6px;
                    padding: 8px 12px;
                    margin: 8px 0;
                    border-left: 3px solid #949BA4;
                    color: #DBDEE1;
                    font-size: 13px;
                }

                .ub-guidelines-warn {
                    background: #0f0f0f;
                    border-radius: 6px;
                    padding: 8px 12px;
                    margin: 8px 0;
                    border-left: 3px solid #F0B232;
                    color: #DBDEE1;
                    font-size: 13px;
                }

                .ub-guidelines-panel ul,
                .ub-guidelines-panel ol {
                    margin: 6px 0 0 18px;
                    padding: 0;
                    color: #DBDEE1;
                    font-size: 13.5px;
                }

                .ub-guidelines-panel li {
                    margin-bottom: 4px;
                }

                .ub-guidelines-panel a {
                    color: #7289DA;
                    text-decoration: none;
                }

                .ub-guidelines-panel a:hover {
                    text-decoration: underline;
                }

                .ub-guidelines-panel strong {
                    color: #F2F3F5;
                    font-weight: 700;
                }

                .ub-guidelines-panel .ub-btn {
                    appearance: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    border-radius: 6px;
                    padding: 0 16px;
                    min-height: 38px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 120ms ease, transform 80ms ease;
                }

                .ub-guidelines-panel .ub-btn-primary {
                    background: #5865F2;
                    border: 1px solid #5865F2;
                    color: #ffffff;
                }

                .ub-guidelines-panel .ub-btn-primary:hover {
                    background: #4752C4;
                    border-color: #4752C4;
                }

                .ub-guidelines-panel .ub-btn-primary:active {
                    transform: scale(0.97);
                }

                #ub-dashboard-settings .ub-preview-empty {
                    font-size: 13px;
                    color: var(--ub-text-faint);
                    padding: 4px 0;
                }

                #ub-dashboard-settings .ub-preview-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 16px;
                }

                #ub-dashboard-settings .ub-preview-row-icon {
                    object-fit: contain;
                    flex-shrink: 0;
                    display: block;
                }

                #ub-dashboard-settings .ub-preview-row-label {
                    font-size: 12px;
                    color: var(--ub-text-faint);
                }

                #ub-dashboard-settings .ub-popup-card {
                    border-radius: 8px;
                    padding: 20px 28px;
                    text-align: center;
                    min-width: 180px;
                    width: fit-content;
                    margin: 0;
                    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
                    font-family: var(--font-primary, "gg sans", sans-serif);
                    transition: background 160ms ease;
                }

                #ub-dashboard-settings .ub-popup-card img {
                    width: 64px;
                    height: 64px;
                    object-fit: cover;
                    margin: 0 auto 14px;
                    display: block;
                }

                #ub-dashboard-settings .ub-popup-name {
                    font-weight: 800;
                    font-size: 16px;
                    letter-spacing: 0.3px;
                    line-height: 1.2;
                }

                #ub-dashboard-settings .ub-popup-by {
                    font-size: 12px;
                    color: #949ba4;
                    margin-top: 4px;
                }

                #ub-dashboard-settings .ub-preview-warning {
                    font-size: 11px;
                    color: #f0b132;
                    margin-top: 12px;
                    line-height: 1.5;
                }

                #ub-dashboard-settings .ub-badge-row {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    padding: 10px 14px;
                    background: var(--ub-bg-input);
                    border: 1px solid var(--ub-border);
                    border-radius: var(--ub-radius-sm);
                    margin-bottom: 8px;
                    transition: background-color 120ms ease, border-color 120ms ease;
                }

                #ub-dashboard-settings .ub-badge-row:hover {
                    background: var(--ub-bg-input-hover);
                    border-color: var(--ub-border-strong);
                }

                #ub-dashboard-settings .ub-badge-row.ub-badge-active {
                    background: rgba(88, 101, 242, 0.10);
                    border-color: rgba(88, 101, 242, 0.45);
                    box-shadow: inset 0 0 0 1px rgba(88, 101, 242, 0.15);
                }

                #ub-dashboard-settings .ub-badge-thumb {
                    width: 28px;
                    height: 28px;
                    border-radius: 50%;
                    object-fit: cover;
                    flex-shrink: 0;
                    background: rgba(255,255,255,0.06);
                    border: 1px solid var(--ub-border-strong);
                }

                #ub-dashboard-settings .ub-badge-row-name {
                    flex: 1;
                    font-size: 14px;
                    font-weight: 500;
                    color: var(--ub-text);
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                #ub-dashboard-settings .ub-badge-row-name .ub-badge-active-tag {
                    font-size: 12px;
                    font-weight: 600;
                    color: var(--ub-text-muted);
                    margin-left: 6px;
                }

                #ub-dashboard-settings .ub-badge-row-actions {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    flex-shrink: 0;
                }

                #ub-dashboard-settings .ub-badge-use-btn {
                    appearance: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: var(--ub-radius-sm);
                    padding: 0 14px;
                    min-height: 32px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    background: var(--ub-accent);
                    border: 1px solid var(--ub-accent);
                    color: #ffffff;
                    transition: background-color 120ms ease, border-color 120ms ease, transform 80ms ease;
                }
                #ub-dashboard-settings .ub-badge-use-btn:hover {
                    background: var(--ub-accent-hover);
                    border-color: var(--ub-accent-hover);
                }
                #ub-dashboard-settings .ub-badge-use-btn:active { transform: scale(0.96); }

                #ub-dashboard-settings .ub-badge-delete-btn {
                    appearance: none;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: var(--ub-radius-sm);
                    padding: 0 14px;
                    min-height: 32px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    background: var(--ub-danger);
                    border: 1px solid var(--ub-danger);
                    color: #ffffff;
                    transition: background-color 120ms ease, border-color 120ms ease, transform 80ms ease;
                }
                #ub-dashboard-settings .ub-badge-delete-btn:hover {
                    background: #c42f33;
                    border-color: #c42f33;
                }
                #ub-dashboard-settings .ub-badge-delete-btn:active { transform: scale(0.96); }

                #ub-dashboard-settings #ub-my-badges-list:empty::after {
                    content: "No saved badges yet";
                    font-size: 13px;
                    color: var(--ub-text-faint);
                    font-style: italic;
                    display: block;
                    padding: 4px 0 10px;
                }

                #ub-dashboard-settings .ub-divider {
                    display: none;
                }

                #ub-dashboard-settings a:focus-visible,
                #ub-dashboard-settings button:focus-visible {
                    outline: none;
                }

                @keyframes ub-gradient-flow {
                    0%   { background-position: 0% 50%; }
                    20%  { background-position: 80% 50%; }
                    40%  { background-position: 160% 50%; }
                    60%  { background-position: 240% 50%; }
                    80%  { background-position: 320% 50%; }
                    100% { background-position: 400% 50%; }
                }

                .ub-gradient-text {
                    background: linear-gradient(90deg,
                        #2d3899,
                        #3a45a8,
                        #4752c4,
                        #4f5ed6,
                        #5865f2,
                        #5f6ef3,
                        #6677f4,
                        #7289da,
                        #6677f4,
                        #5f6ef3,
                        #5865f2,
                        #4f5ed6,
                        #4752c4,
                        #3a45a8,
                        #2d3899
                    );
                    background-size: 400% auto;
                    -webkit-background-clip: text;
                    background-clip: text;
                    -webkit-text-fill-color: transparent;
                    color: transparent;
                    animation: ub-gradient-flow 14s ease-in-out infinite;
                }

                #ub-dashboard-settings .ub-dropdown {
                    position: relative;
                    width: 100%;
                    user-select: none;
                }

                #ub-dashboard-settings .ub-dropdown-trigger {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    width: 100%;
                    background: rgba(255, 255, 255, 0.04);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border: 1px solid rgba(255, 255, 255, 0.10);
                    border-top-color: rgba(255, 255, 255, 0.16);
                    border-radius: var(--ub-radius-sm);
                    padding: 10px 12px;
                    min-height: 40px;
                    color: var(--ub-text);
                    font-size: 14px;
                    cursor: pointer;
                    box-shadow:
                        inset 0 1px 0 rgba(255, 255, 255, 0.07),
                        0 2px 8px rgba(0, 0, 0, 0.35);
                    transition: border-color 150ms ease, background 150ms ease, box-shadow 150ms ease;
                }

                #ub-dashboard-settings .ub-dropdown-trigger:hover {
                    background: rgba(255, 255, 255, 0.07);
                    border-color: rgba(255, 255, 255, 0.18);
                    border-top-color: rgba(255, 255, 255, 0.24);
                }

                #ub-dashboard-settings .ub-dropdown.open .ub-dropdown-trigger {
                    border-color: rgba(88, 101, 242, 0.6);
                    border-top-color: rgba(88, 101, 242, 0.8);
                    box-shadow:
                        inset 0 1px 0 rgba(255, 255, 255, 0.08),
                        0 0 0 3px rgba(88, 101, 242, 0.18);
                    border-bottom-left-radius: 0;
                    border-bottom-right-radius: 0;
                }

                #ub-dashboard-settings .ub-dropdown-arrow {
                    flex-shrink: 0;
                    color: var(--ub-text-faint);
                    transition: transform 180ms ease;
                }

                #ub-dashboard-settings .ub-dropdown.open .ub-dropdown-arrow {
                    transform: rotate(180deg);
                }

                #ub-dashboard-settings .ub-dropdown-menu {
                    display: none;
                    position: absolute;
                    top: 100%;
                    left: 0;
                    right: 0;
                    z-index: 999;
                    background: rgba(10, 10, 18, 0.82);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    border: 1px solid rgba(88, 101, 242, 0.4);
                    border-top: none;
                    border-bottom-left-radius: var(--ub-radius-sm);
                    border-bottom-right-radius: var(--ub-radius-sm);
                    box-shadow:
                        0 8px 32px rgba(0, 0, 0, 0.6),
                        inset 0 0 0 1px rgba(255, 255, 255, 0.04);
                    overflow: hidden;
                }

                #ub-dashboard-settings .ub-dropdown.open .ub-dropdown-menu {
                    display: block;
                }

                #ub-dashboard-settings .ub-dropdown-option {
                    padding: 10px 12px;
                    font-size: 14px;
                    color: var(--ub-text-secondary);
                    cursor: pointer;
                    transition: background 100ms ease, color 100ms ease;
                }

                #ub-dashboard-settings .ub-dropdown-option:hover {
                    background: rgba(88, 101, 242, 0.2);
                    color: var(--ub-text);
                }

                #ub-dashboard-settings .ub-dropdown-option.selected {
                    background: rgba(88, 101, 242, 0.3);
                    color: #ffffff;
                    font-weight: 600;
                }

                .ub-dash-tab { cursor: pointer; transition: color 120ms ease, border-bottom-color 120ms ease; }
                .ub-dash-tab:not([aria-selected="true"]):hover { color: #DBDEE1 !important; }

                .ub-tabpanel {
                    opacity: 1;
                    transform: translateY(0);
                    transition: opacity 160ms ease, transform 160ms ease;
                }
                .ub-tabpanel.ub-hidden { display: none; }
                .ub-tabpanel.ub-panel-fade-out {
                    opacity: 0;
                    transform: translateY(5px);
                }
                .ub-tabpanel.ub-panel-fade-in {
                    opacity: 0;
                    transform: translateY(-5px);
                }

                @media (prefers-reduced-motion: reduce) {
                    .ub-tabpanel { transition: none; }
                }

                #ub-dashboard-settings .ub-choice-group {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }

                #ub-dashboard-settings .ub-choice {
                    appearance: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    flex: 1 1 0;
                    justify-content: center;
                    min-height: 40px;
                    padding: 0 12px;
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid rgba(255, 255, 255, 0.10);
                    border-radius: var(--ub-radius-sm);
                    color: var(--ub-text-secondary);
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 120ms ease, border-color 120ms ease, color 120ms ease;
                }

                #ub-dashboard-settings .ub-choice:hover {
                    background: rgba(255, 255, 255, 0.07);
                    border-color: rgba(255, 255, 255, 0.18);
                    color: var(--ub-text);
                }

                #ub-dashboard-settings .ub-choice.selected {
                    background: var(--ub-accent-soft);
                    border-color: rgba(88, 101, 242, 0.6);
                    color: #ffffff;
                }

                #ub-dashboard-settings .ub-choice:focus-visible {
                    outline: none;
                    box-shadow: 0 0 0 3px var(--ub-accent-soft);
                }

                @keyframes ub-preview-fade {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.35; }
                }

                #ub-dashboard-settings #ub-popup-anim-group .ub-choice:hover {
                    animation: ub-preview-fade 1100ms ease-in-out infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                    #ub-dashboard-settings #ub-popup-anim-group .ub-choice:hover {
                        animation: none;
                    }
                }

                #ub-dashboard-settings .ub-shape-swatch {
                    display: block;
                    width: 16px;
                    height: 16px;
                    flex-shrink: 0;
                    background: currentColor;
                    opacity: 0.9;
                }

                #ub-dashboard-settings .ub-color-row {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                #ub-dashboard-settings .ub-color-input {
                    appearance: none;
                    -webkit-appearance: none;
                    width: 40px;
                    height: 40px;
                    flex-shrink: 0;
                    padding: 0;
                    border: 2px solid rgba(255, 255, 255, 0.16);
                    border-radius: 50%;
                    cursor: pointer;
                    background: none;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
                    transition: border-color 120ms ease, transform 80ms ease;
                }

                #ub-dashboard-settings .ub-color-input:hover {
                    border-color: rgba(255, 255, 255, 0.32);
                }

                #ub-dashboard-settings .ub-color-input:active {
                    transform: scale(0.95);
                }

                #ub-dashboard-settings .ub-color-input::-webkit-color-swatch-wrapper {
                    padding: 0;
                    border-radius: 50%;
                }

                #ub-dashboard-settings .ub-color-input::-webkit-color-swatch {
                    border: none;
                    border-radius: 50%;
                }

                #ub-dashboard-settings .ub-color-input::-moz-color-swatch {
                    border: none;
                    border-radius: 50%;
                }

                #ub-dashboard-settings .ub-color-hex {
                    font-size: 13px;
                    font-weight: 600;
                    font-family: "Consolas", "Menlo", monospace;
                    color: var(--ub-text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.02em;
                }

                #ub-dashboard-settings .ub-color-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 16px;
                }

                #ub-dashboard-settings .ub-field.ub-disabled {
                    opacity: 0.4;
                    pointer-events: none;
                }

                #ub-dashboard-settings .ub-switch-row {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    padding: 10px 0;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
                }

                #ub-dashboard-settings .ub-switch-row:last-child {
                    border-bottom: none;
                }

                #ub-dashboard-settings .ub-switch-row.ub-disabled {
                    opacity: 0.4;
                    pointer-events: none;
                }

                #ub-dashboard-settings .ub-switch-copy {
                    flex: 1;
                }

                #ub-dashboard-settings .ub-switch-label {
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--ub-text);
                    margin-bottom: 2px;
                }

                #ub-dashboard-settings .ub-switch-desc {
                    font-size: 12px;
                    line-height: 1.4;
                    color: var(--ub-text-faint);
                }

                #ub-dashboard-settings .ub-switch {
                    position: relative;
                    flex-shrink: 0;
                    width: 40px;
                    height: 24px;
                    border-radius: 999px;
                    border: none;
                    background: rgba(255, 255, 255, 0.14);
                    cursor: pointer;
                    padding: 0;
                    transition: background 200ms ease;
                }

                #ub-dashboard-settings .ub-switch::after {
                    content: "";
                    position: absolute;
                    top: 3px;
                    left: 3px;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: #ffffff;
                    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
                    transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
                }

                #ub-dashboard-settings .ub-switch.on {
                    background: var(--ub-accent);
                }

                #ub-dashboard-settings .ub-switch.on::after {
                    transform: translateX(16px);
                }

                #ub-dashboard-settings .ub-switch:disabled {
                    opacity: 0.4;
                    cursor: not-allowed;
                }

                #ub-dashboard-settings .ub-value-pill {
                    display: inline-block;
                    margin-left: 8px;
                    padding: 1px 8px;
                    background: rgba(255, 255, 255, 0.06);
                    border-radius: 999px;
                    color: var(--ub-text-secondary);
                    font-size: 11px;
                    font-weight: 700;
                    letter-spacing: 0;
                    text-transform: none;
                    vertical-align: middle;
                }

                #ub-dashboard-settings .ub-range {
                    appearance: none;
                    -webkit-appearance: none;
                    width: 100%;
                    height: 6px;
                    border-radius: 999px;
                    background: rgba(255, 255, 255, 0.10);
                    outline: none;
                    cursor: pointer;
                    margin-top: 4px;
                }

                #ub-dashboard-settings .ub-range::-webkit-slider-runnable-track {
                    width: 100%;
                    height: 6px;
                    border-radius: 999px;
                    background: rgba(255, 255, 255, 0.18);
                }

                #ub-dashboard-settings .ub-range::-webkit-slider-thumb {
                    appearance: none;
                    -webkit-appearance: none;
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: var(--ub-accent);
                    border: 3px solid #ffffff;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
                    cursor: pointer;
                    transition: transform 80ms ease;
                
                    margin-top: -6px;
                }

                #ub-dashboard-settings .ub-range::-webkit-slider-thumb:hover {
                    transform: scale(1.1);
                }

                #ub-dashboard-settings .ub-range::-moz-range-thumb {
                    width: 18px;
                    height: 18px;
                    border-radius: 50%;
                    background: var(--ub-accent);
                    border: 3px solid #ffffff;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
                    cursor: pointer;
                }

                #ub-dashboard-settings .ub-range::-moz-range-track {
                    height: 6px;
                    border-radius: 999px;
                    background: rgba(255, 255, 255, 0.18);
                }

                /* Discord's own settings classes (contentSection_b6bcee / content_b6bcee)
                   are built to sit centered next to a nav sidebar column. We don't render
                   that sidebar. The dashboard now fills the entire viewport (see
                   dashboardView.js), so instead of forcing everything flush-left at a
                   narrow width - which left a huge dead zone on the right on any wide
                   screen - center a wider column in the available space. */
                #ub-dashboard-content .contentSection_b6bcee {
                    display: flex !important;
                    justify-content: center !important;
                    width: 100%;
                }

                #ub-dashboard-content .content_b6bcee {
                    margin: 0 auto !important;
                    width: 100%;
                }

            </style>

            <div class="scroller__23746 thin_d125d2 scrollerBase_d125d2" dir="ltr" style="overflow: hidden scroll; flex: 1 1 auto; min-height: 0; padding: 24px; background-color: #000000; font-family: 'gg sans', 'Noto Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;">
                <section class="contentSection_b6bcee">
                    <div class="content_b6bcee" style="max-width: 960px; width: 100%;">
                        <h2 id="ub-page-heading" class="display-lg_cf4812 ub-gradient-text" data-text-variant="display-lg" style="margin-bottom: 6px; font-weight: 800; font-size: 48px; letter-spacing: -0.02em; white-space: nowrap; line-height: 1.1;">
                            Custom Badges
                        </h2>
                        <p id="ub-page-subtitle" class="text-md/normal_cf4812" data-text-variant="text-md/normal" style="color: #949ba4; margin-bottom: 24px; font-size: 15px; line-height: 1.5;">
                            Adds a self-hosted custom badge with hover tooltip and click-to-view popup card, visible to anyone else running this plugin.
                        </p>

                        <div id="ub-dashboard-settings">
                        <div id="ub-panel-badges" class="ub-tabpanel">
                            <div class="ub-section">
                                <div class="ub-section-head">
                                    <div class="ub-section-icon">${icon.shield}</div>
                                    <div class="ub-eyebrow">Account Verification</div>
                                </div>
                                <p class="ub-hint">
                                    Prove you own this Discord account so the server accepts badge changes as coming from you. No passwords or long-lived Discord tokens are ever stored - just a short-lived, revocable proof.
                                </p>
                                <div class="ub-btn-row">
                                    <button type="button" id="ub-verify-account" class="ub-btn ub-btn-primary">Verify Discord Account</button>
                                    <button type="button" id="ub-revoke-token" class="ub-btn ub-btn-danger-solid" disabled>Revoke Your Token</button>
                                </div>
                                <div class="ub-field" style="margin-bottom: 0;">
                                    <div class="ub-label">Session Token</div>
                                    <p class="ub-hint" style="margin-bottom: 8px;">Paste the token shown after verifying your account here.</p>
                                    <div class="ub-token-wrap">
                                        <input id="ub-session-token" type="text" class="ub-input" placeholder="Paste your session token here" autocomplete="off" spellcheck="false" />
                                        <div id="ub-session-token-overlay" class="ub-token-overlay"><div id="ub-session-token-overlay-inner" class="ub-token-overlay-inner"></div></div>
                                    </div>
                                </div>
                            </div>

                            <div class="ub-section">
                                <div class="ub-section-head">
                                    <div class="ub-section-icon">${icon.pencil}</div>
                                    <div class="ub-eyebrow">Edit Active Badge</div>
                                </div>
                                <div class="ub-field">
                                    <div class="ub-label">Api Base Url</div>
                                    <input id="ub-api-base-url" type="text" class="ub-input" placeholder="https://custom-badges.shadow-164.workers.dev" />
                                </div>
                                <div class="ub-field">
                                    <div class="ub-label">My Badge Image Url</div>
                                    <input id="ub-badge-image-url" type="text" class="ub-input" placeholder="https://..." />
                                </div>
                                <div class="ub-field" style="margin-bottom: 0;">
                                    <div class="ub-label">My Badge Name</div>
                                    <input id="ub-badge-name" type="text" class="ub-input" placeholder="Your badge name" />
                                </div>
                            </div>
                            <div class="ub-section">
                                <div class="ub-section-head">
                                    <div class="ub-section-icon">${icon.eye}</div>
                                    <div class="ub-eyebrow">Live Preview</div>
                                </div>
                                <div id="ub-live-preview">
                                    <div id="ub-preview-empty" class="ub-preview-empty">
                                        Set your badge image and name above to see a live preview
                                    </div>
                                    <div id="ub-preview-content" class="ub-preview-content" style="display: none;">
                                        <div class="ub-preview-row">
                                            <img id="ub-preview-row-icon" class="ub-preview-row-icon" alt="" />
                                            <span class="ub-preview-row-label">Badge row icon</span>
                                        </div>
                                        <div id="ub-popup-card" class="ub-popup-card">
                                            <img id="ub-popup-img" class="ub-popup-img" alt="" />
                                            <div id="ub-popup-name" class="ub-popup-name"></div>
                                            <div id="ub-popup-by" class="ub-popup-by"></div>
                                        </div>
                                        <div id="ub-preview-warning" class="ub-preview-warning" style="display: none;">
                                            Couldn't sample colors from this image, showing the flat fallback background instead. This can happen if the host blocks cross-origin image reads. What others see may look different from this preview.
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div class="ub-section">
                                <div class="ub-section-head">
                                    <div class="ub-section-icon">${icon.bolt}</div>
                                    <div class="ub-eyebrow">Quick Actions</div>
                                </div>
                                <div class="ub-btn-row">
                                    <button id="ub-share-badge" class="ub-btn">Share Badge</button>
                                    <button id="ub-revert-badge" class="ub-btn ub-btn-primary">Revert To Previous Badge</button>
                                    <button id="ub-refresh-cache" class="ub-btn ub-btn-primary">Refresh Badge Cache</button>
                                </div>

                                <div class="ub-field">
                                    <div class="ub-label">Import Badge Code</div>
                                    <input id="ub-import-badge-code" type="text" class="ub-input" placeholder="Paste a badge code..." />
                                </div>
                                <button id="ub-import-badge" class="ub-btn" style="margin-bottom: 16px;">Import Badge</button>

                                <div class="ub-field">
                                    <div class="ub-label">Selected Preset</div>
                                    <div class="ub-dropdown" id="ub-selected-preset-dropdown">
                                        <div class="ub-dropdown-trigger" id="ub-selected-preset-trigger">
                                            <span class="ub-dropdown-value" id="ub-selected-preset-value">${presetLabels[0] ?? "No presets"}</span>
                                            <svg class="ub-dropdown-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
                                        </div>
                                        <div class="ub-dropdown-menu" id="ub-selected-preset-menu">
                                            ${presetLabels.map((label, i) => `<div class="ub-dropdown-option" data-value="${i}">${label}</div>`).join("\n                                        ")}
                                        </div>
                                    </div>
                                    <input type="hidden" id="ub-selected-preset" value="0" />
                                </div>
                                <button id="ub-apply-preset" class="ub-btn" style="margin-bottom: 0;">Apply Preset</button>
                            </div>

                            <div class="ub-section">
                                <div class="ub-section-head">
                                    <div class="ub-section-icon">${icon.grid}</div>
                                    <div class="ub-eyebrow">My Badges</div>
                                </div>
                                <p class="ub-hint">
                                    Your saved badge slots. Click "Use" on any badge to make it active and publish it. Add a new slot to build another look - you can have up to 12.
                                </p>
                                <div id="ub-my-badges-list" style="margin-bottom: 10px;"></div>
                                <button id="ub-new-badge-slot" class="ub-btn ub-btn-primary">${icon.plus} New Badge Slot</button>
                            </div>

                            <div class="ub-section">
                                <div class="ub-section-head">
                                    <div class="ub-section-icon">${icon.box}</div>
                                    <div class="ub-eyebrow">Badge Packs</div>
                                </div>
                                <p class="ub-hint">
                                    Import a pack of badges from a raw GitHub URL, or export your current badges as a pack to share with others.
                                </p>
                                <div class="ub-field">
                                    <div class="ub-label">Import Pack from URL</div>
                                    <p class="ub-hint" style="margin-bottom: 8px;">Raw GitHub URL to a badge pack JSON file (e.g. https://raw.githubusercontent.com/you/repo/main/packs/friend-group.json). Use the raw.githubusercontent.com link, not a github.com/blob/... page.</p>
                                    <input id="ub-import-pack-url" type="text" class="ub-input" placeholder="https://raw.githubusercontent.com/ItzMeShadow999/Badges/main/packs/DiscordBadges.json" />
                                </div>
                                <div class="ub-btn-row" style="margin-bottom: 0; flex-wrap: wrap; gap: 8px;">
                                    <button id="ub-import-pack" class="ub-btn ub-btn-primary">Import Pack</button>
                                    <button id="ub-make-pack" class="ub-btn">Make Pack (Copy JSON)</button>
                                    <button id="ub-browse-packs" class="ub-btn">Add More Packs</button>
                                    <button id="ub-view-guidelines" type="button" class="ub-btn-link">View Publish Guide</button>
                                </div>
                            </div>

                            <div class="ub-section" style="margin-bottom: 0;">
                                <div class="ub-section-head">
                                    <div class="ub-section-icon">${icon.toggle}</div>
                                    <div class="ub-eyebrow">Behavior</div>
                                </div>

                                <div class="ub-switch-row">
                                    <div class="ub-switch-copy">
                                        <div class="ub-switch-label">Show Tooltip</div>
                                        <div class="ub-switch-desc">Show a small tooltip when hovering a custom badge</div>
                                    </div>
                                    <button type="button" id="ub-show-tooltip" class="ub-switch on" role="switch" aria-checked="true"></button>
                                </div>

                                <div class="ub-switch-row" id="ub-show-popup-row">
                                    <div class="ub-switch-copy">
                                        <div class="ub-switch-label">Show Popup</div>
                                        <div class="ub-switch-desc">Show a popup card when clicking a custom badge.</div>
                                    </div>
                                    <button type="button" id="ub-show-popup" class="ub-switch on" role="switch" aria-checked="true"></button>
                                </div>

                                <div class="ub-switch-row" id="ub-show-owner-tag-row">
                                    <div class="ub-switch-copy">
                                        <div class="ub-switch-label">Show Owner Tag</div>
                                        <div class="ub-switch-desc">Show who created the badge underneath its name in the popup</div>
                                    </div>
                                    <button type="button" id="ub-show-owner-tag" class="ub-switch on" role="switch" aria-checked="true"></button>
                                </div>

                                <div class="ub-field" id="ub-owner-tag-format-field" style="margin-top: 12px;">
                                    <div class="ub-label">Owner Tag Format</div>
                                    <p class="ub-hint" style="margin-bottom: 8px;">Use <code>{username}</code> for the creator's username, and <code>{pluginusedate}</code> for the date they first started using this plugin.</p>
                                    <input id="ub-owner-tag-format" type="text" class="ub-input" placeholder="By {username}" />
                                </div>

                                <div class="ub-switch-row">
                                    <div class="ub-switch-copy">
                                        <div class="ub-switch-label">Append Tag</div>
                                        <div class="ub-switch-desc">Add a [BD] suffix after your badge name. Seen by everyone who views your badge.</div>
                                    </div>
                                    <button type="button" id="ub-append-tag" class="ub-switch" role="switch" aria-checked="false"></button>
                                </div>

                                <div class="ub-switch-row">
                                    <div class="ub-switch-copy">
                                        <div class="ub-switch-label">Hide Own Badge</div>
                                        <div class="ub-switch-desc">Don't show my own badge to myself when viewing my own profile</div>
                                    </div>
                                    <button type="button" id="ub-hide-own-badge" class="ub-switch" role="switch" aria-checked="false"></button>
                                </div>

                                <div class="ub-switch-row">
                                    <div class="ub-switch-copy">
                                        <div class="ub-switch-label">Restrict to Mutual Servers</div>
                                        <div class="ub-switch-desc">Only show your badge to people who share a server with you</div>
                                    </div>
                                    <button type="button" id="ub-restrict-mutual-guilds" class="ub-switch" role="switch" aria-checked="false"></button>
                                </div>
                            </div>
                        </div>

                        <div id="ub-panel-style" class="ub-tabpanel ub-hidden">
                            <div class="ub-section">
                                <div class="ub-section-head">
                                    <div class="ub-section-icon">${icon.eye}</div>
                                    <div class="ub-eyebrow">Icon Appearance</div>
                                </div>

                                <div class="ub-field">
                                    <div class="ub-label">Icon Shape</div>
                                    <div class="ub-choice-group" id="ub-icon-shape-group">
                                        <button type="button" class="ub-choice" data-value="circle">
                                            <span class="ub-shape-swatch" style="border-radius: 50%;"></span>
                                            Circle
                                        </button>
                                        <button type="button" class="ub-choice" data-value="rounded">
                                            <span class="ub-shape-swatch" style="border-radius: 5px;"></span>
                                            Rounded
                                        </button>
                                        <button type="button" class="ub-choice" data-value="square">
                                            <span class="ub-shape-swatch" style="border-radius: 0;"></span>
                                            Square
                                        </button>
                                    </div>
                                    <input type="hidden" id="ub-icon-shape" value="circle" />
                                </div>

                                <div class="ub-field">
                                    <div class="ub-label">Icon Size <span class="ub-value-pill" id="ub-icon-size-value">22px</span></div>
                                    <input type="range" id="ub-icon-size" class="ub-range" min="12" max="48" step="1" value="22" />
                                </div>

                                <div class="ub-field">
                                    <div class="ub-label">Hover Effect</div>
                                    <div class="ub-choice-group" id="ub-hover-effect-group">
                                        <button type="button" class="ub-choice" data-value="none">None</button>
                                        <button type="button" class="ub-choice" data-value="scale">Scale Up</button>
                                        <button type="button" class="ub-choice" data-value="glow">Glow</button>
                                    </div>
                                    <input type="hidden" id="ub-hover-effect" value="none" />
                                </div>

                                <div class="ub-field" id="ub-glow-color-field" style="margin-bottom: 0;">
                                    <div class="ub-label">Glow Color</div>
                                    <div class="ub-color-row">
                                        <input type="color" id="ub-glow-color" class="ub-color-input" value="#ffffff" />
                                        <span class="ub-color-hex" id="ub-glow-color-hex">#FFFFFF</span>
                                    </div>
                                </div>
                            </div>

                            <div class="ub-section">
                                <div class="ub-section-head">
                                    <div class="ub-section-icon">${icon.box}</div>
                                    <div class="ub-eyebrow">Popup Card</div>
                                </div>

                                <div class="ub-field">
                                    <div class="ub-label">Background</div>
                                    <div class="ub-choice-group" id="ub-bg-mode-group">
                                        <button type="button" class="ub-choice" data-value="base">Base</button>
                                        <button type="button" class="ub-choice" data-value="sample">Sample Image</button>
                                        <button type="button" class="ub-choice" data-value="edit">Edit Gradient</button>
                                    </div>
                                    <input type="hidden" id="ub-bg-mode" value="base" />
                                </div>

                                <div class="ub-field" id="ub-gradient-fields">
                                    <div class="ub-color-grid">
                                        <div>
                                            <div class="ub-label">Main Color</div>
                                            <div class="ub-color-row">
                                                <input type="color" id="ub-gradient-main" class="ub-color-input" value="#1d1d1d" />
                                                <span class="ub-color-hex" id="ub-gradient-main-hex">#1D1D1D</span>
                                            </div>
                                        </div>
                                        <div>
                                            <div class="ub-label">Second Color</div>
                                            <div class="ub-color-row">
                                                <input type="color" id="ub-gradient-secondary" class="ub-color-input" value="#2a2a38" />
                                                <span class="ub-color-hex" id="ub-gradient-secondary-hex">#2A2A38</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="ub-field">
                                    <div class="ub-label">Name Color</div>
                                    <div class="ub-color-row">
                                        <input type="color" id="ub-name-color" class="ub-color-input" value="#ffffff" />
                                        <span class="ub-color-hex" id="ub-name-color-hex">#FFFFFF</span>
                                    </div>
                                </div>

                                <div class="ub-field" style="margin-bottom: 0;">
                                    <div class="ub-label">Popup Animation</div>
                                    <div class="ub-choice-group" id="ub-popup-anim-group">
                                        <button type="button" class="ub-choice" data-value="fade">Fade</button>
                                        <button type="button" class="ub-choice" data-value="scale">Scale</button>
                                        <button type="button" class="ub-choice" data-value="slide">Slide</button>
                                    </div>
                                    <input type="hidden" id="ub-popup-anim" value="fade" />
                                </div>
                            </div>
                            <div class="ub-section" style="margin-bottom: 0;">
                                <div class="ub-section-head">
                                    <div class="ub-section-icon">${icon.eye}</div>
                                    <div class="ub-eyebrow">Live Preview</div>
                                </div>
                                <div>
                                    <div class="ub-preview-empty">
                                        Set your badge image and name in the Custom Badges tab to see a live preview
                                    </div>
                                    <div class="ub-preview-content" style="display: none;">
                                        <div class="ub-preview-row">
                                            <img class="ub-preview-row-icon" alt="" />
                                            <span class="ub-preview-row-label">Badge row icon</span>
                                        </div>
                                        <div class="ub-popup-card">
                                            <img class="ub-popup-img" alt="" />
                                            <div class="ub-popup-name"></div>
                                            <div class="ub-popup-by"></div>
                                        </div>
                                        <div class="ub-preview-warning" style="display: none;">
                                            Couldn't sample colors from this image, showing the flat fallback background instead. This can happen if the host blocks cross-origin image reads. What others see may look different from this preview.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div id="ub-guidelines-backdrop" class="ub-guidelines-backdrop" id="ub-guidelines-backdrop"></div>
            <div id="ub-guidelines-panel" class="ub-guidelines-panel">
                <button type="button" class="ub-guidelines-close" id="ub-guidelines-close" title="Close">✕</button>
                <div class="ub-guidelines-h2">📦 Badge Pack Sharing Guidelines</div>
                <div style="color: var(--ub-text-muted); font-size: 13.5px; margin-bottom: 18px; line-height: 1.55;">Before sharing a pack, make sure it meets these standards so everyone has a smooth experience importing it.</div>

                <div class="ub-guidelines-h3">Format</div>
                <div style="color: var(--ub-text-secondary); margin-bottom: 8px;">Your pack must be a valid JSON file hosted on <code class="ub-guidelines-inline-code">raw.githubusercontent.com</code> - no other hosts are accepted by the importer. The structure should look like this:</div>
                <code class="ub-guidelines-code"><span class="p">{</span>
      <span class="k">"version"</span><span class="p">:</span> <span class="n">1</span><span class="p">,</span>
      <span class="k">"badges"</span><span class="p">:</span> <span class="p">[</span>
        <span class="s">"base64encodedcode"</span><span class="p">,</span>
        <span class="s">"base64encodedcode"</span>
      <span class="p">]</span>
    <span class="p">}</span></code>
                <div style="color: var(--ub-text-secondary);">Each entry in the <code class="ub-guidelines-inline-code">badges</code> array is a badge code generated by the <strong>Make Pack</strong> button in your dashboard.</div>

                <div class="ub-guidelines-h3">Pack Size</div>
                <div class="ub-guidelines-note">ⓘ The importer only loads the <strong>first 6 badges</strong> from any pack. The <strong>Make Pack</strong> button exports up to <strong>12 badges</strong> (your current plugin save limit). Technically packs can be as large as you want, but we recommend a minimum of <strong>6</strong> and a maximum of <strong>10–15</strong> for the best experience.</div>

                <div class="ub-guidelines-h3">Content Rules</div>
                <div class="ub-guidelines-warn">⚠️ Packs that break these rules will be removed without warning.</div>
                <ul>
                    <li>Badges must use <strong>publicly accessible image URLs</strong> that won't die in a week (no Discord CDN links, no temp hosts)</li>
                    <li>No NSFW, offensive, or hateful imagery</li>
                    <li>No impersonation of other users, plugins, or brands</li>
                </ul>

                <div class="ub-guidelines-h3">How to Submit</div>
                <ol>
                    <li>Generate your pack JSON using the <strong>Make Pack (Copy JSON)</strong> button</li>
                    <li>Push it to the packs repo as <code class="ub-guidelines-inline-code">packs/your-pack-name.json</code> in <a href="https://github.com/ItzMeShadow999/Badges" target="_blank" rel="noopener noreferrer">https://github.com/ItzMeShadow999/Badges</a></li>
                    <li>Open a PR with a short description of the theme</li>
                </ol>

                <div class="ub-guidelines-h3">Tips for a Good Pack</div>
                <ul>
                    <li>Use a clear, descriptive filename (<code class="ub-guidelines-inline-code">anime-icons.json</code>, not <code class="ub-guidelines-inline-code">pack1.json</code>)</li>
                    <li>All badges in a pack should share a <strong>theme or aesthetic</strong> - random assortments are harder to browse</li>
                    <li>Test your pack with <strong>Import Pack from URL</strong> before submitting to make sure every badge imports cleanly</li>
                </ul>

                <div style="margin-top: 24px; display: flex; justify-content: flex-end; padding-top: 16px; border-top: 1px solid var(--ub-border);">
                    <button type="button" id="ub-guidelines-close-btn" class="ub-btn ub-btn-primary">Got it</button>
                </div>
            </div>
        `;
    }

});

__cbDefine("bridge", function (exports, require) {
    exports.setDashboardBridge = setDashboardBridge;
    exports.getDashboardBridge = getDashboardBridge;
    let bridge = null;
    function setDashboardBridge(b) {
        bridge = b;
    }
    function getDashboardBridge() {
        return bridge;
    }

});

__cbDefine("buttonRegistry", function (exports, require) {
    exports.buttonRegistry = void 0;
    const html_1 = require("html");
    class SidebarButtonRegistry {
        constructor() {
            this.buttons = new Map();
        }
        register(button) {
            this.buttons.set(button.id, button);
            this.renderAll();
        }
        unregister(id) {
            if (this.buttons.delete(id)) {
                const existingEl = document.getElementById(`custom-sidebar-btn-${id}`);
                existingEl?.remove();
            }
        }
        getAll() {
            return Array.from(this.buttons.values());
        }
        getSidebarContainer() {
            const candidates = [
                ['[class*="privateChannels"] [role="list"]', () => document.querySelector('[class*="privateChannels"] [role="list"]')],
                ['[class*="privateChannels"] ul', () => document.querySelector('[class*="privateChannels"] ul')],
                ['[class*="privateChannels"]', () => document.querySelector('[class*="privateChannels"]')],
                ['[class*="dmList"]', () => document.querySelector('[class*="dmList"]')],
                ['[aria-label="Direct Messages"] [role="list"]', () => document.querySelector('[aria-label="Direct Messages"] [role="list"]')],
                ['[aria-label="Direct Messages"]', () => document.querySelector('[aria-label="Direct Messages"]')],
            ];
            for (const [label, fn] of candidates) {
                const el = fn();
                if (el) {
                    if (!this._cbLoggedSidebarSelector) {
                        this._cbLoggedSidebarSelector = true;
                        console.log(`[CustomBadges] getSidebarContainer matched via: ${label}`, el);
                    }
                    return el;
                }
            }
            if (!this._cbLoggedSidebarFail) {
                this._cbLoggedSidebarFail = true;
                console.warn("[CustomBadges] getSidebarContainer found NOTHING. None of the selectors matched. " +
                    "Please inspect the DM sidebar in devtools and report back the outer nav/list element's classes.");
            }
            return null;
        }
        renderAll() {
            const sidebarContainer = this.getSidebarContainer();
            if (!sidebarContainer) return false;
            const dmSectionBoundary =
                sidebarContainer.querySelector(':scope > [class*="sectionDivider"]') ||
                sidebarContainer.querySelector(':scope > h2');
            let insertAnchor = null;
            if (!dmSectionBoundary) {
                const allItems = Array.from(sidebarContainer.querySelectorAll(
                    ':scope > [class*="listItem"]:not([id^="custom-sidebar-btn-"]),' +
                    ':scope > li:not([id^="custom-sidebar-btn-"]),' +
                    ':scope > [role="listitem"]:not([id^="custom-sidebar-btn-"])'
                ));
                for (let i = allItems.length - 1; i >= 0; i--) {
                    if (allItems[i].querySelector('a[href], [role="link"], [role="button"]')) {
                        insertAnchor = allItems[i];
                        break;
                    }
                }
            }
            let injectedAny = false;
            for (const button of this.buttons.values()) {
                const elementId = `custom-sidebar-btn-${button.id}`;
                let buttonElement = document.getElementById(elementId);
                if (!buttonElement) {
                    buttonElement = document.createElement("li");
                    buttonElement.id = elementId;
                    buttonElement.style.cssText = "list-style:none;margin:0;padding:0 8px;width:100%;";
                    if (dmSectionBoundary && dmSectionBoundary.parentElement === sidebarContainer) {
                        sidebarContainer.insertBefore(buttonElement, dmSectionBoundary);
                    } else if (insertAnchor && insertAnchor.parentElement === sidebarContainer) {
                        insertAnchor.after(buttonElement);
                    } else {
                        sidebarContainer.insertBefore(buttonElement, sidebarContainer.firstChild);
                    }
                }
                const isSelected = Boolean(button.isActive?.());
                buttonElement.innerHTML = (0, html_1.buttonHtml)(button.label, button.iconSvg, isSelected);
                const inner = buttonElement.querySelector(".cb-dash-btn-inner");
                if (inner) {
                    inner.onclick = e => { e.preventDefault(); button.onClick(e); this.updateAllStates(); };
                    inner.onmouseenter = () => { if (!button.isActive?.()) { inner.style.background = "var(--background-modifier-hover,rgba(79,84,92,0.16))"; inner.style.color = "var(--interactive-hover,#dcddde)"; } };
                    inner.onmouseleave = () => { if (!button.isActive?.()) { inner.style.background = "transparent"; inner.style.color = "var(--interactive-normal,#b5bac1)"; } };
                }
                injectedAny = true;
            }
            return injectedAny;
        }
        updateAllStates() {
            for (const button of this.buttons.values()) {
                const el = document.getElementById(`custom-sidebar-btn-${button.id}`);
                if (!el) continue;
                const inner = el.querySelector(".cb-dash-btn-inner");
                if (inner) {
                    if (button.isActive?.()) {
                        inner.style.background = "rgba(88,101,242,0.2)";
                        inner.style.color = "#fff";
                    } else {
                        inner.style.background = "transparent";
                        inner.style.color = "var(--interactive-normal,#b5bac1)";
                    }
                }
            }
        }
    }
    exports.buttonRegistry = new SidebarButtonRegistry();

});

__cbDefine("button", function (exports, require) {
    exports.registerDashboardButton = registerDashboardButton;
    exports.onRouteChanged = onRouteChanged;
    exports.updateSelectionState = updateSelectionState;
    exports.insertDashboardButton = insertDashboardButton;
    const common_1 = require("@webpack/common");
    const types_1 = require("types");
    const buttonRegistry_1 = require("buttonRegistry");
    const dashboardView_1 = require("dashboardView");
    const DASHBOARD_BUTTON_ID = "user-dashboard";
    function registerDashboardButton() {
        buttonRegistry_1.buttonRegistry.register({
            id: DASHBOARD_BUTTON_ID,
            label: "User Dashboard",
            iconSvg: `
                <svg class="linkButtonIcon__972a0" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 13h6a1 1 0 001-1V4a1 1 0 00-1-1H4a1 1 0 00-1 1v8a1 1 0 001 1zm1-8h4v6H5V5zm9 16h6a1 1 0 001-1v-8a1 1 0 00-1-1h-6a1 1 0 00-1 1v8a1 1 0 001 1zm1-8h4v6h-4v-6zM4 21h6a1 1 0 001-1v-4a1 1 0 00-1-1H4a1 1 0 00-1 1v4a1 1 0 001 1zm1-4h4v2H5v-2zm9-8h6a1 1 0 001-1V4a1 1 0 00-1-1h-6a1 1 0 00-1 1v4a1 1 0 001 1zm1-4h4v2h-4V5z"/>
                </svg>
            `,
            isActive: () => types_1.state.isDashboardActive,
            onClick: e => {
                e.preventDefault();
                e.stopPropagation();
                (0, types_1.setDashboardActive)(!types_1.state.isDashboardActive);
                let navigated = false;
                if (types_1.state.isDashboardActive && !window.location.pathname.startsWith("/channels/@me")) {
                    try {
                        common_1.NavigationRouter.transitionTo("/channels/@me");
                        navigated = true;
                    } catch (err) {
                        console.warn("[CustomBadges] NavigationRouter.transitionTo failed (non-fatal):", err);
                    }
                }
                if (navigated) {
                    setTimeout(() => {
                        (0, dashboardView_1.renderDashboardView)();
                        setupNativeButtonListeners();
                    }, 50);
                } else {
                    (0, dashboardView_1.renderDashboardView)();
                    setupNativeButtonListeners();
                }
            }
        });
    }
    let _cbSidebarObserver = null;
    let _cbSidebarObserverTarget = null;
    function ensureSidebarPersistence() {
        const container = buttonRegistry_1.buttonRegistry.getSidebarContainer?.();
        if (!container) return;
        if (_cbSidebarObserver && _cbSidebarObserverTarget === container) return;
        if (_cbSidebarObserver) {
            _cbSidebarObserver.disconnect();
        }
        _cbSidebarObserverTarget = container;
        _cbSidebarObserver = new MutationObserver(() => {
            if (!document.getElementById("custom-sidebar-btn-user-dashboard")) {
                if (insertDashboardButton()) {
                    console.log("[CustomBadges] Sidebar button re-inserted after Discord re-rendered the list.");
                    setupNativeButtonListeners();
                    updateSelectionState();
                }
            }
        });
        _cbSidebarObserver.observe(container, { childList: true, subtree: false });
        console.log("[CustomBadges] MutationObserver attached to sidebar container for button persistence.", container);
    }
    function onRouteChanged() {
        let tries = 0;
        const tick = () => {
            if (insertDashboardButton()) {
                console.log(`[CustomBadges] Sidebar button inserted successfully after ${tries} frame(s).`);
                setupNativeButtonListeners();
                updateSelectionState();
                ensureSidebarPersistence();
                return;
            }
            if (++tries < 60) {
                requestAnimationFrame(tick);
            }
            else {
                setTimeout(() => {
                    if (insertDashboardButton()) {
                        console.log("[CustomBadges] Sidebar button inserted on delayed retry.");
                        setupNativeButtonListeners();
                        updateSelectionState();
                        ensureSidebarPersistence();
                    } else {
                        console.warn("[CustomBadges] Gave up trying to insert the sidebar button after 60 frames + 500ms retry. " +
                            "See getSidebarContainer warning above for why.");
                    }
                }, 500);
            }
        };
        requestAnimationFrame(tick);
    }
    function stopSidebarPersistence() {
        if (_cbSidebarObserver) {
            _cbSidebarObserver.disconnect();
            _cbSidebarObserver = null;
            _cbSidebarObserverTarget = null;
        }
    }
    exports.stopSidebarPersistence = stopSidebarPersistence;
    function setupNativeButtonListeners() {
        const sidebar = document.querySelector('[class*="privateChannels"]');
        if (!sidebar) return;
        sidebar.querySelectorAll('a[href], [role="link"], [role="button"]').forEach(el => {
            if (el.closest('[id^="custom-sidebar-btn-"]') || el.getAttribute("data-ub-listener") === "true") return;
            el.setAttribute("data-ub-listener", "true");
            el.addEventListener("click", () => {
                if (types_1.state.isDashboardActive) {
                    (0, types_1.setDashboardActive)(false);
                    const href = el.getAttribute("href") || "";
                    (0, dashboardView_1.renderDashboardView)();
                    if (href === "/channels/@me") {
                        try { common_1.NavigationRouter.transitionTo("/channels/@me"); } catch { }
                    }
                }
            });
        });
    }
    function updateSelectionState() {
        buttonRegistry_1.buttonRegistry.updateAllStates();
    }
    function insertDashboardButton() {
        registerDashboardButton();
        return buttonRegistry_1.buttonRegistry.renderAll();
    }

});

__cbDefine("dashboardView", function (exports, require) {
    exports.renderDashboardView = renderDashboardView;
    exports.restoreDefaultView = restoreDefaultView;
    const html_1 = require("html");
    const types_1 = require("types");
    const buttonRegistry_1 = require("buttonRegistry");
    const bridge_1 = require("bridge");
    const wireSettings_1 = require("wireSettings");
    const DASHBOARD_CANVAS_ID = "ub-dashboard-wrapper";

    function renderDashboardView() {
        if (!types_1.state.isDashboardActive) {
            restoreDefaultView();
            return;
        }
        let wrapper = document.getElementById(DASHBOARD_CANVAS_ID);
        if (!wrapper) {
            wrapper = document.createElement("div");
            wrapper.id = DASHBOARD_CANVAS_ID;
            wrapper.className = "cb-dashboard-overlay";
            wrapper.style.cssText = `
                position: fixed;
                inset: 0;
                z-index: 2147483647;
                display: flex;
                flex-direction: column;
                background-color: #000000;
                width: 100vw;
                height: 100vh;
                overflow: hidden;
            `;
            wrapper.innerHTML = `
                ${(0, html_1.headerBarHtml)()}
                <div id="ub-dashboard-content" style="
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    box-sizing: border-box;
                    min-height: 0;
                    overflow-y: auto;
                    overflow-x: hidden;
                ">
                    ${(0, html_1.dashboardHtml)((0, bridge_1.getDashboardBridge)()?.presetLabels ?? [])}
                </div>
            `;
            (0, wireSettings_1.wireDashboardSettings)(wrapper);
        }
        if (wrapper.parentElement !== document.body) {
            document.body.appendChild(wrapper);
        }
        wrapper.style.display = "flex";
        buttonRegistry_1.buttonRegistry.updateAllStates();
    }
    function restoreDefaultView() {
        const wrapper = document.getElementById(DASHBOARD_CANVAS_ID);
        if (wrapper) {
            wrapper.remove();
        }
        buttonRegistry_1.buttonRegistry.updateAllStates();
    }

});

__cbDefine("wireSettings", function (exports, require) {
    exports.wireDashboardSettings = wireDashboardSettings;
    const bridge_1 = require("bridge");
    const types_1 = require("types");
    const dashboardView_1 = require("dashboardView");
    let packGuidelinesShownThisSession = false;
    function wireDashboardSettings(root) {
        const bridge = (0, bridge_1.getDashboardBridge)();
        if (!bridge) {
            console.warn("[UserDashboard] Dashboard bridge not set yet - settings form will not be wired up.");
            return;
        }
        const { settings } = bridge;
        const $ = (id) => root.querySelector(`#${id}`);
        const closeBtn = $("ub-dash-close");
        if (closeBtn && closeBtn.getAttribute("data-ub-listener") !== "true") {
            closeBtn.setAttribute("data-ub-listener", "true");
            closeBtn.addEventListener("click", () => {
                (0, types_1.setDashboardActive)(false);
                (0, dashboardView_1.restoreDefaultView)();
            });
            closeBtn.addEventListener("mouseenter", () => { closeBtn.style.background = "var(--background-modifier-hover,rgba(79,84,92,0.16))"; closeBtn.style.color = "#fff"; });
            closeBtn.addEventListener("mouseleave", () => { closeBtn.style.background = "transparent"; closeBtn.style.color = "#949BA4"; });
        }
        const apiBaseUrl = $("ub-api-base-url");
        const badgeImageUrl = $("ub-badge-image-url");
        const badgeName = $("ub-badge-name");
        const importBadgeCode = $("ub-import-badge-code");
        const importPackUrl = $("ub-import-pack-url");
        const sessionToken = $("ub-session-token");
        const sessionTokenOverlay = $("ub-session-token-overlay-inner");
        const revokeTokenBtn = $("ub-revoke-token");
        const badgeModeInput = $("ub-badge-mode");
        const selectedPresetInput = $("ub-selected-preset");
        const iconSize = $("ub-icon-size");
        const iconSizeValue = $("ub-icon-size-value");
        const hoverEffectInput = $("ub-hover-effect");
        const glowColorField = $("ub-glow-color-field");
        const glowColor = $("ub-glow-color");
        const glowColorHex = $("ub-glow-color-hex");
        const bgModeInput = $("ub-bg-mode");
        const gradientFields = $("ub-gradient-fields");
        const gradientMain = $("ub-gradient-main");
        const gradientMainHex = $("ub-gradient-main-hex");
        const gradientSecondary = $("ub-gradient-secondary");
        const gradientSecondaryHex = $("ub-gradient-secondary-hex");
        const nameColor = $("ub-name-color");
        const nameColorHex = $("ub-name-color-hex");
        const showTooltipSwitch = $("ub-show-tooltip");
        const showPopupSwitch = $("ub-show-popup");
        const showPopupRow = $("ub-show-popup-row");
        const showOwnerTagSwitch = $("ub-show-owner-tag");
        const showOwnerTagRow = $("ub-show-owner-tag-row");
        const ownerTagFormat = $("ub-owner-tag-format");
        const ownerTagFormatField = $("ub-owner-tag-format-field");
        const appendTagSwitch = $("ub-append-tag");
        const hideOwnBadgeSwitch = $("ub-hide-own-badge");
        const restrictMutualGuildsSwitch = $("ub-restrict-mutual-guilds");
        function wireDropdown(dropdownId, hiddenInputId, valueElId, onChange) {
            const dropdown = root.querySelector(`#${dropdownId}`);
            const hiddenInput = $(hiddenInputId);
            const valueEl = root.querySelector(`#${valueElId}`);
            const trigger = root.querySelector(`#${dropdownId} .ub-dropdown-trigger`);
            const menu = root.querySelector(`#${dropdownId} .ub-dropdown-menu`);
            if (!dropdown || !hiddenInput || !valueEl || !trigger || !menu)
                return;
            trigger.addEventListener("click", e => {
                e.stopPropagation();
                const isOpen = dropdown.classList.contains("open");
                root.querySelectorAll(".ub-dropdown.open").forEach(d => d.classList.remove("open"));
                if (!isOpen)
                    dropdown.classList.add("open");
            });
            menu.querySelectorAll(".ub-dropdown-option").forEach(opt => {
                opt.addEventListener("click", () => {
                    const val = opt.dataset.value ?? "";
                    hiddenInput.value = val;
                    valueEl.textContent = opt.textContent ?? "";
                    menu.querySelectorAll(".ub-dropdown-option").forEach(o => o.classList.remove("selected"));
                    opt.classList.add("selected");
                    dropdown.classList.remove("open");
                    onChange?.(val);
                });
            });
        }
        document.addEventListener("click", () => {
            root.querySelectorAll(".ub-dropdown.open").forEach(d => d.classList.remove("open"));
        });
        const TAB_COPY = {
            badges: {
                title: "Custom Badges",
                subtitle: "Adds a self-hosted custom badge with hover tooltip and click-to-view popup card, visible to anyone else running this plugin."
            },
            style: {
                title: "Styles Menu",
                subtitle: "Shape, size, hover effects, popup background, name color, and animation - everything that controls how your badge looks. Every change here is visible to anyone who views your badge."
            }
        };
        const pageHeading = root.querySelector("#ub-page-heading");
        const pageSubtitle = root.querySelector("#ub-page-subtitle");
        const tabUnderline = root.querySelector("#ub-tab-underline");
        const tabsContainer = root.querySelector("#ub-tabs-container");
        let activeTab = "badges";
        const prefersReducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
        function positionUnderline(tabEl) {
            if (!tabUnderline || !tabsContainer || !tabEl)
                return;
            const containerRect = tabsContainer.getBoundingClientRect();
            const tabRect = tabEl.getBoundingClientRect();
            tabUnderline.style.left = `${tabRect.left - containerRect.left}px`;
            tabUnderline.style.width = `${tabRect.width}px`;
        }
        function switchTab(tab) {
            if (tab === activeTab)
                return;
            activeTab = tab;
            root.querySelectorAll(".ub-dash-tab").forEach(t => {
                const active = t.dataset.tab === tab;
                t.setAttribute("aria-selected", String(active));
                t.style.borderBottomColor = active ? "#5865F2" : "transparent";
                t.style.color = active ? "#fff" : "#949BA4";
                t.style.fontWeight = active ? "600" : "500";
                if (active) positionUnderline(t);
            });
            const copy = TAB_COPY[tab] ?? TAB_COPY.badges;
            if (pageHeading)
                pageHeading.textContent = copy.title;
            if (pageSubtitle)
                pageSubtitle.textContent = copy.subtitle;
            const targetPanel = root.querySelector(`#ub-panel-${tab}`);
            const currentPanel = root.querySelector(".ub-tabpanel:not(.ub-hidden)");
            if (!targetPanel || targetPanel === currentPanel)
                return;
            if (prefersReducedMotion) {
                currentPanel?.classList.add("ub-hidden");
                targetPanel.classList.remove("ub-hidden");
                return;
            }
            currentPanel?.classList.add("ub-panel-fade-out");
            setTimeout(() => {
                currentPanel?.classList.add("ub-hidden");
                currentPanel?.classList.remove("ub-panel-fade-out");
                targetPanel.classList.remove("ub-hidden");
                targetPanel.classList.add("ub-panel-fade-in");
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => targetPanel.classList.remove("ub-panel-fade-in"));
                });
            }, 150);
        }
        root.querySelectorAll(".ub-dash-tab").forEach(t => {
            t.addEventListener("click", () => switchTab(t.dataset.tab ?? "badges"));
        });
        positionUnderline(root.querySelector('.ub-dash-tab[aria-selected="true"]'));
        window.addEventListener("resize", () => {
            positionUnderline(root.querySelector(`#ub-tab-${activeTab}`));
        });
        function wireChoiceGroup(groupId, hiddenInputId, onChange) {
            const group = root.querySelector(`#${groupId}`);
            const hiddenInput = $(hiddenInputId);
            if (!group || !hiddenInput)
                return;
            group.querySelectorAll(".ub-choice").forEach(btn => {
                btn.addEventListener("click", () => {
                    const val = btn.dataset.value ?? "";
                    hiddenInput.value = val;
                    group.querySelectorAll(".ub-choice").forEach(b => b.classList.remove("selected"));
                    btn.classList.add("selected");
                    onChange?.(val);
                });
            });
        }
        function setChoiceGroupValue(groupId, hiddenInputId, val) {
            const group = root.querySelector(`#${groupId}`);
            const hiddenInput = $(hiddenInputId);
            if (!group || !hiddenInput)
                return;
            hiddenInput.value = val;
            group.querySelectorAll(".ub-choice").forEach(b => {
                b.classList.toggle("selected", b.dataset.value === val);
            });
        }
        function wireSwitch(btn, onChange) {
            if (!btn)
                return;
            btn.addEventListener("click", () => {
                if (btn.disabled)
                    return;
                const next = !btn.classList.contains("on");
                btn.classList.toggle("on", next);
                btn.setAttribute("aria-checked", String(next));
                onChange(next);
            });
        }
        function setSwitchValue(btn, val) {
            if (!btn)
                return;
            btn.classList.toggle("on", val);
            btn.setAttribute("aria-checked", String(val));
        }
        let tokenMasked = !!settings.store.sessionToken;
        function escapeHtml(s) {
            return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
        function syncOverlayScroll() {
            if (!sessionToken || !sessionTokenOverlay)
                return;
            sessionTokenOverlay.style.transform = `translateX(${-sessionToken.scrollLeft}px)`;
        }
        function buildTokenChars(masked) {
            if (!sessionToken || !sessionTokenOverlay)
                return;
            const value = sessionToken.value;
            sessionToken.classList.toggle("ub-token-empty", !value);
            if (!value) {
                sessionTokenOverlay.innerHTML = "";
                syncOverlayScroll();
                return;
            }
            const chars = value.split("");
            sessionTokenOverlay.innerHTML = chars.map((ch, i) => {
                const delay = masked ? i * 16 : (chars.length - 1 - i) * 16;
                return `<span class="ub-token-char">` +
                    `<span class="ub-token-glyph ub-token-glyph-letter${!masked ? " ub-token-shown" : ""}" style="transition-delay:${delay}ms">${escapeHtml(ch)}</span>` +
                    `<span class="ub-token-glyph ub-token-glyph-dot${masked ? " ub-token-shown" : ""}" style="transition-delay:${delay}ms">•</span>` +
                    `</span>`;
            }).join("");
            syncOverlayScroll();
        }
        function setTokenMasked(masked) {
            if (!sessionTokenOverlay)
                return;
            const charEls = sessionTokenOverlay.querySelectorAll(".ub-token-char");
            const total = charEls.length;
            charEls.forEach((charEl, i) => {
                const delay = masked ? i * 16 : (total - 1 - i) * 16;
                const letter = charEl.querySelector(".ub-token-glyph-letter");
                const dot = charEl.querySelector(".ub-token-glyph-dot");
                if (letter) {
                    letter.style.transitionDelay = `${delay}ms`;
                    letter.classList.toggle("ub-token-shown", !masked);
                }
                if (dot) {
                    dot.style.transitionDelay = `${delay}ms`;
                    dot.classList.toggle("ub-token-shown", masked);
                }
            });
            syncOverlayScroll();
        }
        sessionToken?.addEventListener("focus", () => {
            tokenMasked = false;
            setTokenMasked(false);
        });
        sessionToken?.addEventListener("blur", () => {
            if (!sessionToken.value) {
                tokenMasked = true;
                return;
            }
            requestAnimationFrame(() => {
                tokenMasked = true;
                setTokenMasked(true);
            });
        });
        sessionToken?.addEventListener("input", () => {
            buildTokenChars(document.activeElement === sessionToken ? false : tokenMasked);
        });
        sessionToken?.addEventListener("scroll", syncOverlayScroll);
        const guidelinesPanel = $("ub-guidelines-panel");
        const guidelinesBackdrop = $("ub-guidelines-backdrop");
        const CRT_CLOSE_ANIM_MS = 340;
        let guidelinesClosing = false;
        function openGuidelines() {
            if (!guidelinesPanel)
                return;
            guidelinesClosing = false;
            guidelinesPanel.classList.remove("ub-panel-closing");
            void guidelinesPanel.offsetWidth;
            guidelinesPanel.classList.add("ub-panel-open");
            if (guidelinesBackdrop)
                guidelinesBackdrop.classList.add("ub-backdrop-open");
        }
        function closeGuidelines() {
            if (!guidelinesPanel || guidelinesClosing || !guidelinesPanel.classList.contains("ub-panel-open"))
                return;
            guidelinesClosing = true;
            if (guidelinesBackdrop)
                guidelinesBackdrop.classList.remove("ub-backdrop-open");
            guidelinesPanel.classList.add("ub-panel-closing");
            setTimeout(() => {
                guidelinesPanel.classList.remove("ub-panel-open", "ub-panel-closing");
                guidelinesClosing = false;
            }, CRT_CLOSE_ANIM_MS);
        }
        $("ub-view-guidelines")?.addEventListener("click", openGuidelines);
        $("ub-guidelines-close")?.addEventListener("click", closeGuidelines);
        $("ub-guidelines-close-btn")?.addEventListener("click", closeGuidelines);
        guidelinesBackdrop?.addEventListener("click", closeGuidelines);
        function updatePopupLockState() {
            const locked = settings.store.badgeMode === "vencord";
            showPopupRow?.classList.toggle("ub-disabled", locked);
            if (showPopupSwitch)
                showPopupSwitch.disabled = locked;
            showOwnerTagRow?.classList.toggle("ub-disabled", locked);
            if (showOwnerTagSwitch)
                showOwnerTagSwitch.disabled = locked;
            ownerTagFormatField?.classList.toggle("ub-disabled", locked);
            if (ownerTagFormat)
                ownerTagFormat.disabled = locked;
        }
        wireDropdown("ub-badge-mode-dropdown", "ub-badge-mode", "ub-badge-mode-value", val => {
            settings.store.badgeMode = val;
            bridge.onBadgeModeChange(val);
            updatePopupLockState();
        });
        wireSwitch(showTooltipSwitch, val => {
            settings.store.showTooltip = val;
        });
        wireSwitch(showPopupSwitch, val => {
            settings.store.showPopup = val;
        });
        wireSwitch(showOwnerTagSwitch, val => {
            settings.store.showOwnerTag = val;
        });
        ownerTagFormat?.addEventListener("change", () => {
            settings.store.ownerTagFormat = ownerTagFormat.value;
        });
        wireSwitch(appendTagSwitch, val => {
            settings.store.appendTag = val;
            updatePreview();
            bridge.publishBadge();
        });
        wireSwitch(hideOwnBadgeSwitch, val => {
            settings.store.hideOwnBadge = val;
        });
        wireSwitch(restrictMutualGuildsSwitch, val => {
            settings.store.restrictToMutualGuilds = val;
        });
        wireDropdown("ub-selected-preset-dropdown", "ub-selected-preset", "ub-selected-preset-value", val => {
            settings.store.selectedPreset = val;
        });
        function updateGlowFieldState() {
            glowColorField?.classList.toggle("ub-disabled", hoverEffectInput?.value !== "glow");
        }
        function updateGradientFieldsState() {
            gradientFields?.classList.toggle("ub-disabled", bgModeInput?.value !== "edit");
        }
        wireChoiceGroup("ub-icon-shape-group", "ub-icon-shape", val => {
            settings.store.badgeIconShape = val;
            updatePreview();
            bridge.publishBadge();
        });
        iconSize?.addEventListener("input", () => {
            if (iconSizeValue)
                iconSizeValue.textContent = `${iconSize.value}px`;
        });
        iconSize?.addEventListener("change", () => {
            settings.store.badgeIconSize = Number(iconSize.value);
            updatePreview();
            bridge.publishBadge();
        });
        wireChoiceGroup("ub-hover-effect-group", "ub-hover-effect", val => {
            settings.store.badgeHoverEffect = val;
            updateGlowFieldState();
            bridge.publishBadge();
        });
        glowColor?.addEventListener("input", () => {
            if (glowColorHex)
                glowColorHex.textContent = glowColor.value.toUpperCase();
        });
        glowColor?.addEventListener("change", () => {
            settings.store.badgeGlowColor = glowColor.value;
            bridge.publishBadge();
        });
        wireChoiceGroup("ub-bg-mode-group", "ub-bg-mode", val => {
            settings.store.popupBackgroundMode = val;
            updateGradientFieldsState();
            updatePreview();
            bridge.publishBadge();
        });
        gradientMain?.addEventListener("input", () => {
            if (gradientMainHex)
                gradientMainHex.textContent = gradientMain.value.toUpperCase();
        });
        gradientMain?.addEventListener("change", () => {
            settings.store.popupGradientMain = gradientMain.value;
            updatePreview();
            bridge.publishBadge();
        });
        gradientSecondary?.addEventListener("input", () => {
            if (gradientSecondaryHex)
                gradientSecondaryHex.textContent = gradientSecondary.value.toUpperCase();
        });
        gradientSecondary?.addEventListener("change", () => {
            settings.store.popupGradientSecondary = gradientSecondary.value;
            updatePreview();
            bridge.publishBadge();
        });
        nameColor?.addEventListener("input", () => {
            if (nameColorHex)
                nameColorHex.textContent = nameColor.value.toUpperCase();
        });
        nameColor?.addEventListener("change", () => {
            settings.store.badgeNameColor = nameColor.value;
            updatePreview();
            bridge.publishBadge();
        });
        wireChoiceGroup("ub-popup-anim-group", "ub-popup-anim", val => {
            settings.store.popupAnimationStyle = val;
            bridge.publishBadge();
        });
        const previewEmpties = Array.from(root.querySelectorAll(".ub-preview-empty"));
        const previewContents = Array.from(root.querySelectorAll(".ub-preview-content"));
        const previewRowIcons = Array.from(root.querySelectorAll(".ub-preview-row-icon"));
        const popupCards = Array.from(root.querySelectorAll(".ub-popup-card"));
        const popupImgs = Array.from(root.querySelectorAll(".ub-popup-img"));
        const popupNames = Array.from(root.querySelectorAll(".ub-popup-name"));
        const popupBys = Array.from(root.querySelectorAll(".ub-popup-by"));
        const previewWarnings = Array.from(root.querySelectorAll(".ub-preview-warning"));
        const radiusFor = (shape) => (shape === "circle" ? "50%" : shape === "rounded" ? "6px" : "0");
        let previewToken = 0;
        async function updatePreview() {
            const token = ++previewToken;
            const url = badgeImageUrl?.value.trim() ?? "";
            const name = badgeName?.value.trim() ?? "";
            if (!url || !name) {
                previewEmpties.forEach(el => el.style.display = "");
                previewContents.forEach(el => el.style.display = "none");
                return;
            }
            previewEmpties.forEach(el => el.style.display = "none");
            previewContents.forEach(el => el.style.display = "");
            const bridge = (0, bridge_1.getDashboardBridge)();
            const data = await bridge?.getPreviewData();
            if (token !== previewToken)
                return;
            const radius = radiusFor(data?.iconShape ?? "circle");
            previewRowIcons.forEach(el => {
                el.src = data?.imageUrl ?? url;
                el.style.width = `${data?.iconSize ?? 22}px`;
                el.style.height = `${data?.iconSize ?? 22}px`;
                el.style.borderRadius = radius;
            });
            popupCards.forEach(el => {
                el.style.background = data?.background ?? "#1d1d1d";
            });
            popupImgs.forEach(el => {
                el.src = data?.imageUrl ?? url;
                el.style.borderRadius = radius;
            });
            popupNames.forEach(el => {
                el.textContent = data?.displayName ?? name;
                el.style.color = data?.nameColor ?? "#ffffff";
            });
            popupBys.forEach(el => {
                el.textContent = data?.ownerTag ?? "";
                el.style.display = data?.ownerTag ? "" : "none";
            });
            previewWarnings.forEach(el => {
                el.style.display = data?.sampleFailed ? "" : "none";
            });
        }
        const myBadgesListEl = $("ub-my-badges-list");
        function renderMyBadgesList() {
            if (!myBadgesListEl)
                return;
            let badges = [];
            try {
                badges = JSON.parse(settings.store.myBadgesJson || "[]");
            }
            catch {
                badges = [];
            }
            const activeId = settings.store.myActiveBadgeId ?? "";
            if (!badges.length) {
                myBadgesListEl.innerHTML = "";
                return;
            }
            myBadgesListEl.innerHTML = badges.map(b => {
                const isActive = b.id === activeId;
                return `
                    <div class="ub-badge-row${isActive ? " ub-badge-active" : ""}" data-badge-id="${b.id}">
                        <img class="ub-badge-thumb" src="${b.imageUrl || ""}" alt="${b.description || ""}" referrerpolicy="no-referrer" />
                        <span class="ub-badge-row-name">
                            ${b.description || "Unnamed badge"}${isActive ? `<span class="ub-badge-active-tag">(active)</span>` : ""}
                        </span>
                        <div class="ub-badge-row-actions">
                            ${!isActive ? `<button type="button" class="ub-badge-use-btn" data-use-id="${b.id}">Use</button>` : ""}
                            <button type="button" class="ub-badge-delete-btn" data-delete-id="${b.id}">Delete</button>
                        </div>
                    </div>
                `;
            }).join("");
            myBadgesListEl.querySelectorAll(".ub-badge-use-btn").forEach(btn => {
                btn.addEventListener("click", async () => {
                    const id = btn.dataset.useId;
                    if (!id)
                        return;
                    btn.disabled = true;
                    btn.textContent = "...";
                    try {
                        await bridge.switchToBadge(id);
                    }
                    finally {
                        syncFromStore();
                    }
                });
            });
            myBadgesListEl.querySelectorAll(".ub-badge-delete-btn").forEach(btn => {
                btn.addEventListener("click", async () => {
                    const id = btn.dataset.deleteId;
                    if (!id)
                        return;
                    btn.disabled = true;
                    btn.textContent = "...";
                    try {
                        await bridge.deleteBadgeSlot(id);
                    }
                    finally {
                        syncFromStore();
                    }
                });
            });
        }
        function syncFromStore() {
            if (apiBaseUrl)
                apiBaseUrl.value = settings.store.apiBaseUrl ?? "";
            if (badgeImageUrl)
                badgeImageUrl.value = settings.store.myBadgeImageUrl ?? "";
            if (badgeName)
                badgeName.value = settings.store.myBadgeName ?? "";
            if (sessionToken)
                sessionToken.value = settings.store.sessionToken ?? "";
            tokenMasked = document.activeElement === sessionToken ? false : !!settings.store.sessionToken;
            buildTokenChars(tokenMasked);
            if (revokeTokenBtn)
                revokeTokenBtn.disabled = !settings.store.sessionToken;
            renderMyBadgesList();
            const modeVal = settings.store.badgeMode ?? "original";
            if (badgeModeInput)
                badgeModeInput.value = modeVal;
            const modeOpt = root.querySelector(`#ub-badge-mode-menu .ub-dropdown-option[data-value="${modeVal}"]`);
            if (modeOpt) {
                root.querySelector("#ub-badge-mode-value").textContent = modeOpt.textContent ?? "";
                root.querySelectorAll("#ub-badge-mode-menu .ub-dropdown-option").forEach(o => o.classList.remove("selected"));
                modeOpt.classList.add("selected");
            }
            const presetVal = String(settings.store.selectedPreset ?? "0");
            if (selectedPresetInput)
                selectedPresetInput.value = presetVal;
            const presetOpt = root.querySelector(`#ub-selected-preset-menu .ub-dropdown-option[data-value="${presetVal}"]`);
            if (presetOpt) {
                root.querySelector("#ub-selected-preset-value").textContent = presetOpt.textContent ?? "";
                root.querySelectorAll("#ub-selected-preset-menu .ub-dropdown-option").forEach(o => o.classList.remove("selected"));
                presetOpt.classList.add("selected");
            }
            setChoiceGroupValue("ub-icon-shape-group", "ub-icon-shape", settings.store.badgeIconShape ?? "circle");
            const sizeVal = settings.store.badgeIconSize ?? 22;
            if (iconSize)
                iconSize.value = String(sizeVal);
            if (iconSizeValue)
                iconSizeValue.textContent = `${sizeVal}px`;
            setChoiceGroupValue("ub-hover-effect-group", "ub-hover-effect", settings.store.badgeHoverEffect ?? "none");
            const glowVal = settings.store.badgeGlowColor ?? "#ffffff";
            if (glowColor)
                glowColor.value = glowVal;
            if (glowColorHex)
                glowColorHex.textContent = glowVal.toUpperCase();
            updateGlowFieldState();
            setChoiceGroupValue("ub-bg-mode-group", "ub-bg-mode", settings.store.popupBackgroundMode ?? "base");
            const gradMainVal = settings.store.popupGradientMain ?? "#1d1d1d";
            if (gradientMain)
                gradientMain.value = gradMainVal;
            if (gradientMainHex)
                gradientMainHex.textContent = gradMainVal.toUpperCase();
            const gradSecVal = settings.store.popupGradientSecondary ?? "#2a2a38";
            if (gradientSecondary)
                gradientSecondary.value = gradSecVal;
            if (gradientSecondaryHex)
                gradientSecondaryHex.textContent = gradSecVal.toUpperCase();
            updateGradientFieldsState();
            const nameColorVal = settings.store.badgeNameColor ?? "#ffffff";
            if (nameColor)
                nameColor.value = nameColorVal;
            if (nameColorHex)
                nameColorHex.textContent = nameColorVal.toUpperCase();
            setChoiceGroupValue("ub-popup-anim-group", "ub-popup-anim", settings.store.popupAnimationStyle ?? "fade");
            setSwitchValue(showTooltipSwitch, settings.store.showTooltip ?? true);
            setSwitchValue(showPopupSwitch, settings.store.showPopup ?? true);
            setSwitchValue(showOwnerTagSwitch, settings.store.showOwnerTag ?? true);
            if (ownerTagFormat)
                ownerTagFormat.value = settings.store.ownerTagFormat ?? "By {username}";
            setSwitchValue(appendTagSwitch, settings.store.appendTag ?? false);
            setSwitchValue(hideOwnBadgeSwitch, settings.store.hideOwnBadge ?? false);
            setSwitchValue(restrictMutualGuildsSwitch, settings.store.restrictToMutualGuilds ?? false);
            updatePopupLockState();
            updatePreview();
        }
        syncFromStore();
        apiBaseUrl?.addEventListener("change", () => {
            settings.store.apiBaseUrl = apiBaseUrl.value;
        });
        badgeImageUrl?.addEventListener("input", updatePreview);
        badgeImageUrl?.addEventListener("change", () => {
            settings.store.myBadgeImageUrl = badgeImageUrl.value;
            updatePreview();
            bridge.publishBadge();
        });
        badgeName?.addEventListener("input", updatePreview);
        badgeName?.addEventListener("change", () => {
            settings.store.myBadgeName = badgeName.value;
            updatePreview();
            bridge.publishBadge();
        });
        $("ub-share-badge")?.addEventListener("click", () => bridge.shareMyBadge());
        $("ub-revert-badge")?.addEventListener("click", () => {
            bridge.revertBadge();
            syncFromStore();
        });
        $("ub-refresh-cache")?.addEventListener("click", () => bridge.refreshBadgeCache());
        $("ub-import-badge")?.addEventListener("click", () => {
            settings.store.importBadgeCode = importBadgeCode?.value ?? "";
            bridge.importBadgeFromCode();
            if (importBadgeCode)
                importBadgeCode.value = "";
            syncFromStore();
        });
        $("ub-apply-preset")?.addEventListener("click", () => {
            bridge.applySelectedPreset();
            syncFromStore();
        });
        $("ub-new-badge-slot")?.addEventListener("click", () => {
            bridge.createNewBadgeSlot();
            syncFromStore();
        });
        $("ub-import-pack")?.addEventListener("click", () => {
            settings.store.importPackUrl = importPackUrl?.value ?? "";
            bridge.importPackFromUrl();
            syncFromStore();
        });
        $("ub-make-pack")?.addEventListener("click", () => {
            bridge.makePack();
            if (!settings.store.packGuidelinesShown) {
                settings.store.packGuidelinesShown = true;
                openGuidelines();
            }
        });
        $("ub-browse-packs")?.addEventListener("click", () => bridge.browsePacks());
        $("ub-verify-account")?.addEventListener("click", () => bridge.verifyAccount());
        sessionToken?.addEventListener("change", () => {
            settings.store.sessionToken = sessionToken.value;
            if (revokeTokenBtn)
                revokeTokenBtn.disabled = !settings.store.sessionToken;
        });
        revokeTokenBtn?.addEventListener("click", async () => {
            if (!settings.store.sessionToken || revokeTokenBtn.disabled)
                return;
            revokeTokenBtn.disabled = true;
            const originalLabel = revokeTokenBtn.textContent;
            revokeTokenBtn.textContent = "Revoking...";
            try {
                await bridge.revokeSessionToken();
            }
            finally {
                syncFromStore();
                if (revokeTokenBtn.textContent === "Revoking...")
                    revokeTokenBtn.textContent = originalLabel;
            }
        });
    }

});
function __cbSetWebpackCommon(exportsObj) {
    __cbModules["@webpack/common"] = { factory: null, exports: exportsObj };
}

module.exports = class CustomBadges {
    constructor(meta) {
        this.meta = meta;
        this.name = meta && meta.name ? meta.name : "CustomBadges";

        this.MAX_BADGES = 12;
        this.DEFAULT_API_BASE = "https://custom-badges.shadow-164.workers.dev";
        this.DEFAULT_PACKS_REPO_URL = "https://github.com/ItzMeShadow999/Badges";
        this.DEFAULT_PACKS_INDEX_URL = "";
        this.BADGE_EXPIRY_WARNING_DAYS = 14;
        this.BADGE_HISTORY_LIMIT = 2;
        this.BADGE_HISTORY_DEBOUNCE_MS = 3000;

        this.BLOCKED_BADGE_NAMES = new Set([
            "discord", "discord mod", "staff", "discord developer",
            "discord active developer", "discord staff", "discord moderator",
            "discord employee", "discord team", "discord partner",
            "discord support", "certified moderator", "verified bot developer"
        ].map(n => this.normalizeBadgeName(n)));

        this.BLOCKED_BADGE_NAME_MESSAGE = "That badge name isn't allowed - it impersonates an official Discord role/badge";

        this.BUILTIN_PRESETS = [
            { label: "Hypesquad Legacy", imageUrl: "https://files.catbox.moe/lreui6.png", name: "Hypesquad legacy ",
                style: { iconShape: "circle", iconSize: 22, hoverEffect: "glow", glowColor: "#5865F2", nameColor: "#5865F2", appendTag: false },
                prefs: { showTooltip: true, hideOwnBadge: false } },
            { label: "Minecraft Account", imageUrl: "https://i.pinimg.com/736x/82/b2/1f/82b21fe6d9166c673eed585a5fc38ef5.jpg", name: "Mincraft Account",
                style: { iconShape: "circle", iconSize: 22, hoverEffect: "glow", glowColor: "#f54e6d", nameColor: "#ffffff", appendTag: false },
                prefs: { showTooltip: true, hideOwnBadge: false } },
            { label: "Konata Haii", imageUrl: "https://files.catbox.moe/lri82r.gif", name: "konata haii",
                style: { iconShape: "circle", iconSize: 22, hoverEffect: "glow", glowColor: "#4955e3", nameColor: "#ffffff", appendTag: false },
                prefs: { showTooltip: true, hideOwnBadge: false } },
            { label: "Cat", imageUrl: "https://i.ibb.co/4gWjN4fN/5c3d6e5876ff2a6ea5372317c5a4fbd7-removebg-preview.png", name: "Cat",
                style: { iconShape: "circle", iconSize: 22, hoverEffect: "glow", glowColor: "#ffd6de", nameColor: "#ffffff", appendTag: false },
                prefs: { showTooltip: true, hideOwnBadge: false } },
            { label: "Verified Discord User", imageUrl: "https://files.catbox.moe/aodhtf.png", name: "Verified Discord User",
                style: { iconShape: "circle", iconSize: 30, hoverEffect: "scale", glowColor: "#0095ff", nameColor: "#ffffff", appendTag: false },
                prefs: { showTooltip: true, hideOwnBadge: false } },
            { label: "I like Vencord", imageUrl: "https://files.catbox.moe/g2sqaj.png", name: "I like Vencord",
                style: { iconShape: "square", iconSize: 22, hoverEffect: "glow", glowColor: "#FCC1CC", nameColor: "#ffffff", appendTag: true },
                prefs: { showTooltip: true, hideOwnBadge: false } }
        ];

        this.DEFAULTS = {
            apiBaseUrl: this.DEFAULT_API_BASE,
            sessionToken: "",
            myBadgeImageUrl: "",
            myBadgeName: "",
            selectedPreset: "0",
            showTooltip: true,
            appendTag: false,
            badgeNameColor: "#ffffff",
            badgeIconSize: 22,
            badgeIconShape: "circle",
            badgeHoverEffect: "none",
            badgeGlowColor: "#ffffff",
            hideOwnBadge: false,
            myBadgesJson: "[]",
            myActiveBadgeId: "",
            importBadgeCode: "",
            importPackUrl: "",
            packRepoUrl: this.DEFAULT_PACKS_REPO_URL,
            packsIndexUrl: this.DEFAULT_PACKS_INDEX_URL,
            restrictToMutualGuilds: false,
            debugLogging: false,
            showDashboardButton: true,
            showPopup: true,
            showOwnerTag: true,
            ownerTagFormat: "By {username}",
            popupBackgroundMode: "base",
            popupGradientMain: "#1d1d1d",
            popupGradientSecondary: "#2a2a38",
            popupAnimationStyle: "fade",
            firstUsedDate: "",
            packGuidelinesShown: false
        };

        this.DEFAULT_BADGE_STYLE = {
            iconShape: "circle", iconSize: 22, hoverEffect: "none",
            glowColor: "#ffffff", nameColor: "#ffffff", appendTag: false,
            popupAnimation: "fade", popupBackgroundMode: "base",
            popupGradientMain: "#1d1d1d", popupGradientSecondary: "#2a2a38",
            firstUsedDate: ""
        };
        this.DEFAULT_BADGE_PREFS = {
            showTooltip: true, hideOwnBadge: false,
            showPopup: true, showOwnerTag: true, ownerTagFormat: "By {username}"
        };
        this._sampledColorCache = new Map();

        this.suppressPublishOnChange = false;
        this.expiryWarningShownThisSession = false;
        this.lastPublishedSnapshot = null;
        this.lastHistoryPushAt = 0;
        this.cache = new Map();
        this.CACHE_TTL_MS = 30_000;
        this._observer = null;
        this._pollIntervalId = null;
        this._pendingContainers = new WeakMap();
        this._rowHealers = new Map();
        this._patches = [];

        this.React = BdApi.React;
        this.h = BdApi.React.createElement;
    }

    getSetting(key) {
        const v = BdApi.Data.load(this.name, key);
        return v === undefined ? this.DEFAULTS[key] : v;
    }
    setSetting(key, value) {
        BdApi.Data.save(this.name, key, value);
    }

    start() {
        this.UserStore = BdApi.Webpack.getStore("UserStore");
        this.GuildStore = BdApi.Webpack.getStore("GuildStore");
        this.GuildMemberStore = BdApi.Webpack.getStore("GuildMemberStore");

        if (!this.getSetting("firstUsedDate")) {
            this.setSetting("firstUsedDate", new Date().toISOString());
        }

        BdApi.DOM.addStyle(this.name, `
            .cb-badge-img { object-fit: contain; display: inline-block; vertical-align: middle; cursor: default; }
            .cb-badge-img.cb-hover-scale { transition: transform 0.12s ease; }
            .cb-badge-img.cb-hover-glow { transition: filter 0.18s cubic-bezier(0.16,1,0.3,1); }
            .cb-badge-img.cb-clickable { cursor: pointer; }
            .cb-token-input { font-family: var(--font-code, Consolas, "Courier New", monospace); }

            .cb-badge-popup {
                position: fixed; z-index: 10001; background: var(--cb-popup-bg, #1d1d1d); border-radius: 8px;
                padding: 20px 28px; text-align: center; box-shadow: 0 8px 24px rgba(0,0,0,0.5);
                opacity: 0; pointer-events: none;
                transition: opacity 0.24s cubic-bezier(0.16,1,0.3,1), transform 0.24s cubic-bezier(0.16,1,0.3,1);
                font-family: var(--font-primary, "gg sans", sans-serif); min-width: 180px;
            }
            .cb-badge-popup.visible { opacity: 1; pointer-events: auto; }
            .cb-badge-popup.cb-anim-fade { transform: translateY(8px) scale(0.96); }
            .cb-badge-popup.cb-anim-fade.visible { transform: translateY(0) scale(1); }
            .cb-badge-popup.cb-anim-scale { transform: scale(0.8); transform-origin: 50% 100%; }
            .cb-badge-popup.cb-anim-scale.visible { transform: scale(1); }
            .cb-badge-popup.cb-anim-slide { transform: translateY(16px); }
            .cb-badge-popup.cb-anim-slide.visible { transform: translateY(0); }
            .cb-badge-popup::after {
                content: ""; position: absolute; top: 100%; left: 50%; transform: translateX(-50%);
                border-width: 7px; border-style: solid;
                border-color: var(--cb-popup-arrow, var(--cb-popup-bg, #1d1d1d)) transparent transparent transparent;
            }
            .cb-badge-popup img { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; margin-bottom: 14px; display: block; margin-left: auto; margin-right: auto; }
            .cb-badge-popup .cb-name { font-weight: 800; font-size: 16px; letter-spacing: 0.3px; color: #fff; line-height: 1.2; }
            .cb-badge-popup .cb-by { font-size: 12px; color: #949ba4; margin-top: 4px; }
        `);

        this.tryPatchProfileStorePrefetch();
        this.startProfileObserver();
        this.syncMyBadgesFromServer();
        this.startDashboard();
    }

    stop() {
        BdApi.DOM.removeStyle(this.name);
        BdApi.Patcher.unpatchAll(this.name);
        if (this._observer) {
            this._observer.disconnect();
            this._observer = null;
        }
        if (this._pollIntervalId) {
            clearInterval(this._pollIntervalId);
            this._pollIntervalId = null;
        }
        if (this._rowHealers) {
            this._rowHealers.forEach(observer => observer.disconnect());
            this._rowHealers.clear();
        }
        document.querySelectorAll(".cb-injected-badge").forEach(el => el.remove());
        this.cache.clear();

        this.stopFollowingPopup();
        this.detachGlobalCloseListeners();
        this._popupEl?.remove();
        this._popupEl = null;
        this._popupOpenFor = null;

        this.stopDashboard();
    }

    startDashboard() {
        try {
            const navUtils = BdApi.Webpack.getByKeys("transitionTo", "replaceWith") || { transitionTo() {} };
            if (!navUtils || typeof navUtils.transitionTo !== "function") {
                console.warn("[CustomBadges] NavigationRouter (transitionTo/replaceWith) not found via BdApi.Webpack.getByKeys - using no-op stub. Route-based dashboard closing will not work.");
            } else {
                console.log("[CustomBadges] NavigationRouter found:", navUtils);
            }
            __cbSetWebpackCommon({ NavigationRouter: navUtils });

            const self = this;
            this._dashboardSettingsProxy = new Proxy({}, {
                get(_t, prop) { return self.getSetting(String(prop)); },
                set(_t, prop, value) { self.setSetting(String(prop), value); return true; }
            });

            __cbRequire("bridge").setDashboardBridge({
                settings: { store: this._dashboardSettingsProxy },
                presetLabels: this.BUILTIN_PRESETS.map(p => p.label),
                getPreviewData: () => this.getDashboardPreviewData(),
                shareMyBadge: () => this.shareMyBadge(),
                revertBadge: () => this.revertBadge(),
                refreshBadgeCache: () => this.refreshBadgeCache(),
                importBadgeFromCode: () => this.importBadgeFromCode(),
                applySelectedPreset: () => this.applySelectedPreset(),
                createNewBadgeSlot: () => this.createNewBadgeSlot(),
                importPackFromUrl: () => this.importPackFromUrl(),
                makePack: () => this.makePack(),
                browsePacks: () => this.browsePacks(),
                onBadgeModeChange: v => this.onBadgeModeChange(v),
                publishBadge: () => this.updateMyBadgeFromSettings(),
                verifyAccount: () => this.verifyDiscordAccount(),
                revokeSessionToken: () => this.revokeSessionToken(),
                switchToBadge: id => this.switchToBadge(id),
                deleteBadgeSlot: id => this.deleteBadgeSlot(id)
            });

            this._dashTypes = __cbRequire("types");
            this._dashButton = __cbRequire("button");
            this._dashView = __cbRequire("dashboardView");
            this._dashButtonRegistry = __cbRequire("buttonRegistry");

            this._onDashboardRouteChanged = () => {
                if (this._dashTypes.state.isDashboardActive) {
                    if (!window.location.pathname.startsWith("/channels/@me")) {
                        this._dashTypes.setDashboardActive(false);
                        this._dashView.restoreDefaultView();
                    } else {
                        this._dashView.renderDashboardView();
                    }
                }
                if (this.getSetting("showDashboardButton")) {
                    this._dashButton.onRouteChanged();
                }
            };

            this._fluxDispatcher = BdApi.Webpack.getByKeys("dispatch", "subscribe");
            if (this._fluxDispatcher && typeof this._fluxDispatcher.subscribe === "function") {
                this._fluxDispatcher.subscribe("ROUTE_CHANGED", this._onDashboardRouteChanged);
                console.log("[CustomBadges] Subscribed to ROUTE_CHANGED via FluxDispatcher:", this._fluxDispatcher);
            } else {
                console.warn("[CustomBadges] FluxDispatcher (dispatch/subscribe) not found via BdApi.Webpack.getByKeys - ROUTE_CHANGED events won't be observed.");
            }

            console.log("[CustomBadges] startDashboard() completed setup, calling initial onRouteChanged()...");
            if (this.getSetting("showDashboardButton")) {
                this._dashButton.onRouteChanged();
            } else {
                console.log("[CustomBadges] showDashboardButton is off - skipping initial sidebar button insertion.");
            }
        } catch (e) {
            console.error("[CustomBadges] Dashboard failed to start (non-fatal - the plugin's normal badge/settings functionality still works):", e);
        }
    }

    stopDashboard() {
        try {
            if (this._fluxDispatcher && typeof this._fluxDispatcher.unsubscribe === "function" && this._onDashboardRouteChanged) {
                this._fluxDispatcher.unsubscribe("ROUTE_CHANGED", this._onDashboardRouteChanged);
            }
            this._dashButton?.stopSidebarPersistence?.();
            this._dashButtonRegistry?.buttonRegistry?.unregister("user-dashboard");
            this._dashTypes?.setDashboardActive(false);
            this._dashView?.restoreDefaultView();
        } catch (e) {
            console.error("[CustomBadges] Dashboard failed to stop cleanly (non-fatal):", e);
        }
    }

    setDashboardButtonVisible(visible) {
        try {
            if (!this._dashButton || !this._dashButtonRegistry) return;
            if (visible) {
                this._dashButton.onRouteChanged();
            } else {
                if (this._dashTypes?.state?.isDashboardActive) {
                    this._dashTypes.setDashboardActive(false);
                    this._dashView?.restoreDefaultView();
                }
                this._dashButton.stopSidebarPersistence();
                this._dashButtonRegistry.buttonRegistry.unregister("user-dashboard");
            }
        } catch (e) {
            console.error("[CustomBadges] setDashboardButtonVisible failed (non-fatal):", e);
        }
    }

    normalizeBadgeName(name) {
        return (name || "").trim().toLowerCase().replace(/\s+/g, " ");
    }
    isBlockedBadgeName(name) {
        if (!name) return false;
        return this.BLOCKED_BADGE_NAMES.has(this.normalizeBadgeName(name));
    }
    resolveBadgeStyle(remote, ownerFirstUsedDate) {
        const base = Object.assign({}, this.DEFAULT_BADGE_STYLE, remote || {});
        if (remote && typeof remote.appendVencordTag === "boolean") base.appendTag = remote.appendVencordTag;
        if (!base.firstUsedDate && ownerFirstUsedDate) base.firstUsedDate = ownerFirstUsedDate;
        return base;
    }
    getMyBadgeStyle() {
        return {
            iconShape: this.getSetting("badgeIconShape"),
            iconSize: this.getSetting("badgeIconSize"),
            hoverEffect: this.getSetting("badgeHoverEffect"),
            glowColor: this.getSetting("badgeGlowColor"),
            nameColor: this.getSetting("badgeNameColor"),
            appendVencordTag: this.getSetting("appendTag"),
            popupAnimation: this.getSetting("popupAnimationStyle"),
            popupBackgroundMode: this.getSetting("popupBackgroundMode"),
            popupGradientMain: this.getSetting("popupGradientMain"),
            popupGradientSecondary: this.getSetting("popupGradientSecondary"),
            firstUsedDate: this.getSetting("firstUsedDate")
        };
    }
    resolveBadgePrefs(remote) {
        return Object.assign({}, this.DEFAULT_BADGE_PREFS, remote || {});
    }
    getMyBadgePrefs() {
        return {
            showTooltip: this.getSetting("showTooltip"),
            hideOwnBadge: this.getSetting("hideOwnBadge"),
            showPopup: this.getSetting("showPopup"),
            showOwnerTag: this.getSetting("showOwnerTag"),
            ownerTagFormat: this.getSetting("ownerTagFormat")
        };
    }

    formatPluginUseDate(iso) {
        if (!iso) return "unknown date";
        const d = new Date(iso);
        if (isNaN(d.getTime())) return "unknown date";
        return d.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
    }
    formatOwnerTag(ownerUsername, firstUsedDate) {
        let tag = (this.getSetting("ownerTagFormat") || "By {username}").replace("{username}", ownerUsername);
        if (tag.includes("{pluginusedate}")) {
            tag = tag.replace("{pluginusedate}", this.formatPluginUseDate(firstUsedDate));
        }
        return tag;
    }
    sampleImageColor(url) {
        if (this._sampledColorCache.has(url)) return Promise.resolve(this._sampledColorCache.get(url));
        const cache = this._sampledColorCache;
        return new Promise(resolve => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => {
                try {
                    const size = 32;
                    const canvas = document.createElement("canvas");
                    canvas.width = size;
                    canvas.height = size;
                    const ctx = canvas.getContext("2d");
                    if (!ctx) return finish(null);
                    ctx.drawImage(img, 0, 0, size, size);
                    const data = ctx.getImageData(0, 0, size, size).data;
                    let r = 0, g = 0, b = 0, count = 0;
                    for (let i = 0; i < data.length; i += 4) {
                        if (data[i + 3] < 32) continue;
                        r += data[i]; g += data[i + 1]; b += data[i + 2]; count++;
                    }
                    if (!count) return finish(null);
                    finish(`rgb(${Math.round(r / count)}, ${Math.round(g / count)}, ${Math.round(b / count)})`);
                } catch (e) {
                    finish(null);
                }
            };
            img.onerror = () => finish(null);
            img.src = url;
            function finish(color) {
                cache.set(url, color);
                resolve(color);
            }
        });
    }
    async getPopupBackground(imageUrl, style) {
        if (style.popupBackgroundMode === "edit") {
            return {
                background: `radial-gradient(120% 100% at 50% 0%, ${style.popupGradientSecondary} 0%, ${style.popupGradientMain} 65%)`,
                edgeColor: style.popupGradientMain,
                sampleFailed: false
            };
        }
        if (style.popupBackgroundMode === "sample") {
            const sampled = await this.sampleImageColor(imageUrl);
            if (sampled) {
                return { background: `radial-gradient(120% 100% at 50% 0%, ${sampled} 0%, #1d1d1d 65%)`, edgeColor: "#1d1d1d", sampleFailed: false };
            }
            return { background: "#1d1d1d", edgeColor: "#1d1d1d", sampleFailed: true };
        }
        return { background: "#1d1d1d", edgeColor: "#1d1d1d", sampleFailed: false };
    }
    async getDashboardPreviewData() {
        const imageUrl = this.getSetting("myBadgeImageUrl");
        const name = this.getSetting("myBadgeName");
        if (!imageUrl || !name) return null;
        const style = this.getMyBadgeStyle();
        const displayName = this.formatBadgeName(name, style.appendTag);
        const me = this.UserStore && this.UserStore.getCurrentUser();
        const ownerUsername = (me && me.username) || "you";
        const ownerTag = this.getSetting("showOwnerTag") ? this.formatOwnerTag(ownerUsername, style.firstUsedDate) : null;
        const { background, sampleFailed } = await this.getPopupBackground(imageUrl, style);
        return {
            imageUrl, displayName, ownerTag,
            nameColor: style.nameColor, iconShape: style.iconShape, iconSize: style.iconSize,
            background, sampleFailed
        };
    }
    onBadgeModeChange() { }

    getPopupEl() {
        if (this._popupEl) return this._popupEl;
        this._popupEl = document.createElement("div");
        this._popupEl.className = "cb-badge-popup";
        document.body.appendChild(this._popupEl);
        return this._popupEl;
    }
    positionPopup(target, el) {
        const rect = target.getBoundingClientRect();
        const top = rect.top - el.offsetHeight - 12;
        const left = rect.left + rect.width / 2 - el.offsetWidth / 2;
        el.style.top = `${Math.max(top, 4)}px`;
        el.style.left = `${Math.max(left, 4)}px`;
    }
    isTargetVisible(target) {
        if (!document.body.contains(target)) return false;
        const rect = target.getBoundingClientRect();
        if (rect.width <= 0 || rect.height <= 0) return false;
        const vw = window.innerWidth || document.documentElement.clientWidth;
        const vh = window.innerHeight || document.documentElement.clientHeight;
        if (rect.bottom <= 0 || rect.right <= 0 || rect.top >= vh || rect.left >= vw) return false;
        let node = target.parentElement;
        while (node && node !== document.body && node !== document.documentElement) {
            const cs = getComputedStyle(node);
            if (cs.overflow !== "visible" || cs.overflowX !== "visible" || cs.overflowY !== "visible") {
                const nodeRect = node.getBoundingClientRect();
                if (nodeRect.width <= 0 || nodeRect.height <= 0) return false;
                if (rect.bottom <= nodeRect.top || rect.top >= nodeRect.bottom ||
                    rect.right <= nodeRect.left || rect.left >= nodeRect.right) return false;
            }
            node = node.parentElement;
        }
        return true;
    }
    startFollowingPopup(target) {
        this.stopFollowingPopup();
        const step = () => {
            if (!this._popupOpenFor || this._popupOpenFor !== target) return;
            if (!this.isTargetVisible(target)) { this.hidePopup(); return; }
            this.positionPopup(target, this.getPopupEl());
            this._followRaf = requestAnimationFrame(step);
        };
        this._followRaf = requestAnimationFrame(step);
    }
    stopFollowingPopup() {
        if (this._followRaf != null) { cancelAnimationFrame(this._followRaf); this._followRaf = null; }
    }
    hidePopup() {
        this.stopFollowingPopup();
        this.detachGlobalCloseListeners();
        this._popupEl?.classList.remove("visible");
        this._popupOpenFor = null;
    }
    attachGlobalCloseListeners() {
        if (this._globalCloseAttached) return;
        this._globalCloseAttached = true;
        this._onGlobalPointerDown = (e) => {
            const popupEl = this._popupEl;
            const openTarget = this._popupOpenFor;
            if (!openTarget) return;
            if (popupEl && popupEl.contains(e.target)) return;
            if (e.target === openTarget || (openTarget.contains && openTarget.contains(e.target))) return;
            this.hidePopup();
        };
        this._onGlobalScroll = () => { this.hidePopup(); };
        document.addEventListener("pointerdown", this._onGlobalPointerDown, true);
        document.addEventListener("scroll", this._onGlobalScroll, true);
    }
    detachGlobalCloseListeners() {
        if (!this._globalCloseAttached) return;
        this._globalCloseAttached = false;
        if (this._onGlobalPointerDown) document.removeEventListener("pointerdown", this._onGlobalPointerDown, true);
        if (this._onGlobalScroll) document.removeEventListener("scroll", this._onGlobalScroll, true);
        this._onGlobalPointerDown = null;
        this._onGlobalScroll = null;
    }
    async showBadgePopup(target, imageUrl, rawName, ownerUsername, style) {
        const el = this.getPopupEl();
        el.className = `cb-badge-popup cb-anim-${style.popupAnimation}`;
        el.innerHTML = "";
        el.style.setProperty("--cb-popup-bg", "#1d1d1d");
        el.style.setProperty("--cb-popup-arrow", "#1d1d1d");

        const displayName = this.formatBadgeName(rawName, style.appendTag);

        const img = document.createElement("img");
        img.src = imageUrl;
        img.alt = displayName;
        img.referrerPolicy = "no-referrer";
        el.appendChild(img);

        const nameEl = document.createElement("div");
        nameEl.className = "cb-name";
        nameEl.style.color = style.nameColor;
        nameEl.textContent = displayName;
        el.appendChild(nameEl);

        if (this.getSetting("showOwnerTag")) {
            const byEl = document.createElement("div");
            byEl.className = "cb-by";
            byEl.textContent = this.formatOwnerTag(ownerUsername, style.firstUsedDate);
            el.appendChild(byEl);
        }

        el.classList.add("visible");
        this._popupOpenFor = target;
        this.positionPopup(target, el);
        this.startFollowingPopup(target);
        this.attachGlobalCloseListeners();

        const result = await this.getPopupBackground(imageUrl, style);
        if (this._popupOpenFor === target) {
            el.style.setProperty("--cb-popup-bg", result.background);
            el.style.setProperty("--cb-popup-arrow", result.edgeColor);
        }
    }
    formatBadgeName(rawName, appendTag) {
        return appendTag ? `${rawName} [BD]` : rawName;
    }

    genBadgeId() {
        return `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;
    }
    getMyBadges() {
        try {
            const parsed = JSON.parse(this.getSetting("myBadgesJson") || "[]");
            return Array.isArray(parsed) ? parsed : [];
        } catch (e) { return []; }
    }
    setMyBadgesLocal(list) {
        this.setSetting("myBadgesJson", JSON.stringify(list.slice(0, this.MAX_BADGES)));
    }
    getActiveBadgeId() {
        return this.getSetting("myActiveBadgeId") || null;
    }
    findBadgeEntry(id) {
        if (!id) return undefined;
        return this.getMyBadges().find(b => b.id === id);
    }

    encodeBadgeCode() {
        const imageUrl = this.getSetting("myBadgeImageUrl");
        const name = this.getSetting("myBadgeName");
        if (!imageUrl || !name) return null;
        const payload = { imageUrl, name, style: this.getMyBadgeStyle(), prefs: this.getMyBadgePrefs() };
        return btoa(unescape(encodeURIComponent(JSON.stringify(payload))));
    }
    decodeBadgeCode(code) {
        return JSON.parse(decodeURIComponent(escape(atob(code.trim()))));
    }
    shareMyBadge() {
        const code = this.encodeBadgeCode();
        if (!code) {
            BdApi.UI.showToast("Set your badge image and name first", { type: "error" });
            return;
        }
        navigator.clipboard.writeText(code)
            .then(() => BdApi.UI.showToast("Badge code copied to clipboard", { type: "success" }))
            .catch(() => BdApi.UI.showToast("Couldn't copy to clipboard", { type: "error" }));
    }
    validateBadgePayload(parsed) {
        if (!parsed || typeof parsed !== "object") return "That code isn't a valid badge, it didn't decode to an object";
        if (typeof parsed.imageUrl !== "string" || !parsed.imageUrl.trim()) return "That code is missing a valid image URL";
        if (typeof parsed.name !== "string" || !parsed.name.trim()) return "That code is missing a valid badge name";
        if (this.isBlockedBadgeName(parsed.name)) return this.BLOCKED_BADGE_NAME_MESSAGE;
        if (parsed.style !== undefined && parsed.style !== null && (typeof parsed.style !== "object" || Array.isArray(parsed.style)))
            return "That code has an invalid style block";
        if (parsed.prefs !== undefined && parsed.prefs !== null && (typeof parsed.prefs !== "object" || Array.isArray(parsed.prefs)))
            return "That code has an invalid preferences block";
        return null;
    }
    applyBadgeState(state) {
        const style = this.resolveBadgeStyle(state.style);
        const prefs = this.resolveBadgePrefs(state.prefs);
        this.suppressPublishOnChange = true;
        try {
            this.setSetting("myBadgeImageUrl", state.imageUrl);
            this.setSetting("myBadgeName", state.name);
            this.setSetting("badgeIconShape", style.iconShape);
            this.setSetting("badgeIconSize", style.iconSize);
            this.setSetting("badgeHoverEffect", style.hoverEffect);
            this.setSetting("badgeGlowColor", style.glowColor);
            this.setSetting("badgeNameColor", style.nameColor);
            this.setSetting("appendTag", style.appendTag);
            this.setSetting("popupAnimationStyle", style.popupAnimation);
            this.setSetting("popupBackgroundMode", style.popupBackgroundMode);
            this.setSetting("popupGradientMain", style.popupGradientMain);
            this.setSetting("popupGradientSecondary", style.popupGradientSecondary);
            this.setSetting("showTooltip", prefs.showTooltip);
            this.setSetting("hideOwnBadge", prefs.hideOwnBadge);
            this.setSetting("showPopup", prefs.showPopup);
            this.setSetting("showOwnerTag", prefs.showOwnerTag);
            this.setSetting("ownerTagFormat", prefs.ownerTagFormat);
        } finally {
            this.suppressPublishOnChange = false;
        }
        this.updateMyBadgeFromSettings();
    }
    importBadgeFromCode() {
        const code = this.getSetting("importBadgeCode");
        if (!code) { BdApi.UI.showToast("Paste a badge code first", { type: "error" }); return; }
        let parsed;
        try { parsed = this.decodeBadgeCode(code); }
        catch (e) { BdApi.UI.showToast("That badge code isn't valid base64/JSON", { type: "error" }); return; }
        const err = this.validateBadgePayload(parsed);
        if (err) { BdApi.UI.showToast(err, { type: "error" }); return; }
        this.applyBadgeState({ imageUrl: parsed.imageUrl, name: parsed.name, style: parsed.style, prefs: parsed.prefs });
        this.setSetting("importBadgeCode", "");
        BdApi.UI.showToast("Badge imported and saved", { type: "success" });
    }
    applySelectedPreset() {
        const preset = this.BUILTIN_PRESETS[Number(this.getSetting("selectedPreset"))];
        if (!preset) { BdApi.UI.showToast("Pick a preset first", { type: "error" }); return; }
        this.applyBadgeState({ imageUrl: preset.imageUrl, name: preset.name, style: preset.style, prefs: preset.prefs });
        BdApi.UI.showToast(`Applied "${preset.label}" preset and published`, { type: "success" });
    }

    loadBadgeHistory() {
        const v = BdApi.Data.load(this.name, "badgeHistory");
        return Array.isArray(v) ? v : [];
    }
    saveBadgeHistory(history) {
        BdApi.Data.save(this.name, "badgeHistory", history.slice(0, this.BADGE_HISTORY_LIMIT));
    }
    pushBadgeHistory(snapshot) {
        const now = Date.now();
        if (now - this.lastHistoryPushAt < this.BADGE_HISTORY_DEBOUNCE_MS) return;
        this.lastHistoryPushAt = now;
        const history = this.loadBadgeHistory();
        history.unshift(snapshot);
        this.saveBadgeHistory(history);
    }
    revertBadge() {
        const history = this.loadBadgeHistory();
        if (!history.length) { BdApi.UI.showToast("No previous badge saved to revert to yet", { type: "error" }); return; }
        const previous = history.shift();
        this.saveBadgeHistory(history);
        this.applyBadgeState(previous);
        BdApi.UI.showToast("Reverted to your previous badge", { type: "success" });
    }

    REQUEST_TIMEOUT_MS = 10_000;
    RATE_LIMIT_WINDOW_MS = 10_000;
    RATE_LIMIT_MAX_REQUESTS = 50;

    apiBase() {
        return this.getSetting("apiBaseUrl") || this.DEFAULT_API_BASE;
    }

    taggedError(kind, detail) {
        return new Error(`${kind}:${detail}`);
    }

    async fetchWithTimeout(url, options) {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.REQUEST_TIMEOUT_MS);
        try {
            return await fetch(url, Object.assign({}, options, { signal: controller.signal }));
        } catch (e) {
            if (e && e.name === "AbortError") {
                let host = url;
                try { host = new URL(url).host; } catch { }
                throw this.taggedError("TIMEOUT", `Request to ${host} timed out`);
            }
            throw this.taggedError("NETWORK", (e && e.message) || "Network request failed");
        } finally {
            clearTimeout(timeout);
        }
    }

    async parseJsonOrThrow(res) {
        let data = null;
        try {
            data = await res.json();
        } catch { }

        if (res.status === 429) {
            const retryAfter = res.headers.get("Retry-After") ?? "";
            throw this.taggedError("SERVER_RATE_LIMIT", retryAfter || (data && data.error) || "Too many requests");
        }
        if (!res.ok) {
            throw this.taggedError("SERVER_ERROR", `${res.status}:${(data && data.error) || res.statusText || "Unknown error"}`);
        }
        return data;
    }

    checkClientRateLimit() {
        if (!this._writeRequestTimestamps) this._writeRequestTimestamps = [];
        const timestamps = this._writeRequestTimestamps;
        const now = Date.now();
        while (timestamps.length && now - timestamps[0] > this.RATE_LIMIT_WINDOW_MS) {
            timestamps.shift();
        }
        if (timestamps.length >= this.RATE_LIMIT_MAX_REQUESTS) {
            const retryAfterMs = this.RATE_LIMIT_WINDOW_MS - (now - timestamps[0]);
            throw this.taggedError("CLIENT_RATE_LIMIT", String(Math.max(retryAfterMs, 0)));
        }
        timestamps.push(now);
    }

    authHeaders(sessionToken) {
        const headers = { "Content-Type": "application/json" };
        if (sessionToken) headers.Authorization = `Bearer ${sessionToken}`;
        return headers;
    }

    requireSessionToken(sessionToken) {
        if (!sessionToken) {
            throw this.taggedError("NOT_VERIFIED", 'Verify your Discord account in settings first ("Verify Discord Account" button)');
        }
        return sessionToken;
    }

    async apiFetchBadge(userId) {
        const res = await this.fetchWithTimeout(`${this.apiBase()}?userId=${encodeURIComponent(userId)}`);
        if (res.status === 404) return null;
        return this.parseJsonOrThrow(res);
    }

    async apiSetBadge(userId, badgeId, imageUrl, description, style) {
        this.checkClientRateLimit();
        const token = this.requireSessionToken(this.getSetting("sessionToken"));
        const res = await this.fetchWithTimeout(this.apiBase(), {
            method: "POST",
            headers: this.authHeaders(token),
            body: JSON.stringify({ action: "setBadge", userId, badgeId, imageUrl, description, style })
        });
        return this.parseJsonOrThrow(res);
    }

    async apiSetActiveBadge(userId, badgeId) {
        this.checkClientRateLimit();
        const token = this.requireSessionToken(this.getSetting("sessionToken"));
        const res = await this.fetchWithTimeout(this.apiBase(), {
            method: "POST",
            headers: this.authHeaders(token),
            body: JSON.stringify({ action: "setActiveBadge", userId, badgeId })
        });
        return this.parseJsonOrThrow(res);
    }

    async apiDeleteBadge(userId, badgeId) {
        this.checkClientRateLimit();
        const token = this.requireSessionToken(this.getSetting("sessionToken"));
        const res = await this.fetchWithTimeout(this.apiBase(), {
            method: "POST",
            headers: this.authHeaders(token),
            body: JSON.stringify({ action: "deleteBadge", userId, badgeId })
        });
        return this.parseJsonOrThrow(res);
    }

    async apiRevokeToken() {
        const token = this.requireSessionToken(this.getSetting("sessionToken"));
        const res = await this.fetchWithTimeout(`${this.apiBase()}/self/revoke`, {
            method: "POST",
            headers: this.authHeaders(token),
            body: JSON.stringify({})
        });
        return this.parseJsonOrThrow(res);
    }

    isNotVerifiedError(e) {
        const message = e instanceof Error ? e.message : String(e);
        return message.startsWith("NOT_VERIFIED");
    }

    describeBadgeApiError(e) {
        const message = e instanceof Error ? e.message : String(e);
        const sep = message.indexOf(":");
        const kind = sep === -1 ? message : message.slice(0, sep);
        const detail = sep === -1 ? "" : message.slice(sep + 1);

        switch (kind) {
            case "NOT_VERIFIED":
                return 'Verify your Discord account first (see the "Verify Discord Account" button in settings)';
            case "CLIENT_RATE_LIMIT": {
                const seconds = Math.max(1, Math.ceil(Number(detail) / 1000) || 1);
                return `Slow down a little - try again in ${seconds}s`;
            }
            case "SERVER_RATE_LIMIT":
                return detail && /^\d+$/.test(detail)
                    ? `Rate limited by the badge server - try again in ${detail}s`
                    : "Rate limited by the badge server - try again shortly";
            case "TIMEOUT":
                return "Request timed out - the badge server didn't respond in time";
            case "NETWORK":
                return "Couldn't reach the badge server - check your connection";
            case "SERVER_ERROR":
                return "The badge server had a problem - try again in a bit";
            default:
                return "Something went wrong talking to the badge server";
        }
    }

    maybeWarnAboutExpiry(expiresAt) {
        if (!expiresAt || this.expiryWarningShownThisSession) return;
        const expiry = new Date(expiresAt);
        if (isNaN(expiry.getTime())) return;
        const daysLeft = (expiry.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
        if (daysLeft > 0 && daysLeft <= this.BADGE_EXPIRY_WARNING_DAYS) {
            this.expiryWarningShownThisSession = true;
            BdApi.UI.showToast(`Your custom badge expires in ${Math.max(1, Math.round(daysLeft))} day(s). Edit or switch a badge to keep it alive.`, { type: "info" });
        }
    }

    async fetchBadge(userId) {
        const cached = this.cache.get(userId);
        if (cached && Date.now() - cached.time < this.CACHE_TTL_MS) return cached.data;
        try {
            const data = await this.apiFetchBadge(userId);
            const me = this.UserStore && this.UserStore.getCurrentUser();
            const isMe = me && userId === me.id;
            if (isMe) {
                if (data && data.firstRequestAt) {
                    const serverDate = new Date(data.firstRequestAt);
                    if (!isNaN(serverDate.getTime())) {
                        const localRaw = this.getSetting("firstUsedDate");
                        const localDate = localRaw ? new Date(localRaw) : null;
                        if (!localDate || isNaN(localDate.getTime()) || serverDate < localDate) {
                            this.setSetting("firstUsedDate", data.firstRequestAt);
                            this.updateMyBadgeFromSettings();
                        }
                    }
                }
                if (data && Array.isArray(data.badges)) {
                    this.setMyBadgesLocal(data.badges);
                    if (data.activeId) this.setSetting("myActiveBadgeId", data.activeId);
                }
                this.maybeWarnAboutExpiry(data && data.expiresAt);
            }
            let badge = null;
            if (data) {
                const { firstRequestAt, badges, activeId, expiresAt, ...rest } = data;
                badge = data.imageUrl ? rest : null;
            }
            this.cache.set(userId, { data: badge, time: Date.now() });
            return badge;
        } catch (e) {
            console.error("[CustomBadges] fetch failed:", e);
            this.cache.set(userId, { data: null, time: Date.now() });
            return null;
        }
    }

    async syncMyBadgesFromServer() {
        const me = this.UserStore && this.UserStore.getCurrentUser();
        if (!me) return;
        this.cache.delete(me.id);
        await this.fetchBadge(me.id);
        const active = this.findBadgeEntry(this.getActiveBadgeId());
        if (active && !this.getSetting("myBadgeImageUrl")) {
            this.suppressPublishOnChange = true;
            try {
                this.setSetting("myBadgeImageUrl", active.imageUrl);
                this.setSetting("myBadgeName", active.description);
            } finally {
                this.suppressPublishOnChange = false;
            }
        }
    }

    refreshBadgeCache() {
        this.cache.clear();
        BdApi.UI.showToast("Badge cache cleared", { type: "success" });
    }

    verifyDiscordAccount() {
        window.open(`${this.apiBase()}/auth/start`, "_blank", "noopener,noreferrer");
    }

    async revokeSessionToken() {
        try {
            await this.apiRevokeToken();
            this.setSetting("sessionToken", "");
            BdApi.UI.showToast("Token revoked - re-verify to publish badge changes again", { type: "success" });
        } catch (e) {
            console.error("[CustomBadges] Failed to revoke token:", e);
            BdApi.UI.showToast(this.describeBadgeApiError(e), { type: "error" });
        }
    }

    refreshBadgeDomFor(userId) {
        if (!userId) return;
        const stale = document.querySelectorAll(`.cb-injected-badge[data-cb-user-id="${userId}"]`);
        const containers = new Set();
        stale.forEach(el => {
            const container = el.parentElement;
            el.remove();
            if (container) containers.add(container);
        });
        containers.forEach(container => this.handleBadgeContainer(container));
    }

    async setMyBadge(badgeId, imageUrl, description) {
        const me = this.UserStore && this.UserStore.getCurrentUser();
        if (!me) { console.error("[CustomBadges] Not logged in?"); return; }
        try {
            const res = await this.apiSetBadge(me.id, badgeId, imageUrl, description, this.getMyBadgeStyle());
            this.cache.delete(me.id);
            this.refreshBadgeDomFor(me.id);
            console.log("[CustomBadges] Badge set:", res);
        } catch (e) {
            console.error("[CustomBadges] Failed to set badge:", e);
            BdApi.UI.showToast(this.describeBadgeApiError(e), { type: "error" });
        }
    }

    updateMyBadgeFromSettings() {
        const imageUrl = this.getSetting("myBadgeImageUrl");
        const name = this.getSetting("myBadgeName");
        if (!imageUrl || !name) return;
        if (this.isBlockedBadgeName(name)) {
            BdApi.UI.showToast(this.BLOCKED_BADGE_NAME_MESSAGE, { type: "error" });
            return;
        }
        if (this.lastPublishedSnapshot) this.pushBadgeHistory(this.lastPublishedSnapshot);
        this.lastPublishedSnapshot = { imageUrl, name, style: this.getMyBadgeStyle(), prefs: this.getMyBadgePrefs() };

        let id = this.getActiveBadgeId();
        if (!id) { id = this.genBadgeId(); this.setSetting("myActiveBadgeId", id); }

        const list = this.getMyBadges();
        const entry = { id, imageUrl, description: name, style: this.getMyBadgeStyle() };
        const idx = list.findIndex(b => b.id === id);
        if (idx === -1) list.push(entry); else list[idx] = entry;
        this.setMyBadgesLocal(list);
        this.setMyBadge(id, imageUrl, name);
    }

    loadBadgeFieldsIntoSettings(entry) {
        this.suppressPublishOnChange = true;
        try {
            this.setSetting("myBadgeImageUrl", entry.imageUrl);
            this.setSetting("myBadgeName", entry.description);
            const style = this.resolveBadgeStyle(entry.style);
            this.setSetting("badgeIconShape", style.iconShape);
            this.setSetting("badgeIconSize", style.iconSize);
            this.setSetting("badgeHoverEffect", style.hoverEffect);
            this.setSetting("badgeGlowColor", style.glowColor);
            this.setSetting("badgeNameColor", style.nameColor);
            this.setSetting("appendTag", style.appendTag);
            this.setSetting("popupAnimationStyle", style.popupAnimation);
            this.setSetting("popupBackgroundMode", style.popupBackgroundMode);
            this.setSetting("popupGradientMain", style.popupGradientMain);
            this.setSetting("popupGradientSecondary", style.popupGradientSecondary);
        } finally {
            this.suppressPublishOnChange = false;
        }
    }

    async switchToBadge(id) {
        const entry = this.findBadgeEntry(id);
        if (!entry) return;
        this.setSetting("myActiveBadgeId", id);
        this.loadBadgeFieldsIntoSettings(entry);
        const me = this.UserStore && this.UserStore.getCurrentUser();
        if (!me) return;
        try {
            await this.apiSetActiveBadge(me.id, id);
            this.cache.delete(me.id);
            this.refreshBadgeDomFor(me.id);
            BdApi.UI.showToast("Switched active badge", { type: "success" });
        } catch (e) {
            console.error("[CustomBadges] Failed to switch active badge:", e);
            BdApi.UI.showToast(this.describeBadgeApiError(e), { type: "error" });
        }
    }

    createNewBadgeSlot() {
        const list = this.getMyBadges();
        if (list.length >= this.MAX_BADGES) {
            BdApi.UI.showToast(`You can only have up to ${this.MAX_BADGES} badges`, { type: "error" });
            return;
        }
        const id = this.genBadgeId();
        const entry = {
            id,
            imageUrl: this.getSetting("myBadgeImageUrl") || "",
            description: this.getSetting("myBadgeName") || "New Badge",
            style: this.getMyBadgeStyle()
        };
        list.push(entry);
        this.setMyBadgesLocal(list);
        this.setSetting("myActiveBadgeId", id);
        this.loadBadgeFieldsIntoSettings(entry);
        if (entry.imageUrl) this.updateMyBadgeFromSettings();
        BdApi.UI.showToast("New badge slot added - edit the fields above to customize it", { type: "success" });
    }

    async deleteBadgeSlot(id) {
        const list = this.getMyBadges();
        const remaining = list.filter(b => b.id !== id);
        this.setMyBadgesLocal(remaining);
        const me = this.UserStore && this.UserStore.getCurrentUser();
        if (me) {
            try {
                await this.apiDeleteBadge(me.id, id);
                this.cache.delete(me.id);
            } catch (e) {
                console.error("[CustomBadges] Failed to delete badge:", e);
                BdApi.UI.showToast(this.describeBadgeApiError(e), { type: "error" });
            }
        }
        if (this.getActiveBadgeId() === id) {
            const next = remaining[0];
            if (next) {
                this.switchToBadge(next.id);
            } else {
                this.setSetting("myActiveBadgeId", "");
                this.suppressPublishOnChange = true;
                try {
                    this.setSetting("myBadgeImageUrl", "");
                    this.setSetting("myBadgeName", "");
                } finally {
                    this.suppressPublishOnChange = false;
                }
            }
        }
    }

    packUrlLooksValid(url) {
        try { return new URL(url).hostname === "raw.githubusercontent.com"; }
        catch { return false; }
    }
    makePack() {
        const badges = this.getMyBadges();
        if (!badges.length) { BdApi.UI.showToast("You don't have any badges to pack yet", { type: "error" }); return; }
        const codes = badges.map(b => btoa(unescape(encodeURIComponent(JSON.stringify({ imageUrl: b.imageUrl, name: b.description, style: b.style })))));
        const pack = { version: 1, badges: codes };
        navigator.clipboard.writeText(JSON.stringify(pack, null, 2))
            .then(() => {
                const repoHint = this.getSetting("packRepoUrl")
                    ? ` Push it to ${this.getSetting("packRepoUrl")} as packs/your-pack-name.json.`
                    : ' Set "Pack Repo Url" below, then push this as packs/your-pack-name.json in that repo.';
                BdApi.UI.showToast(`Pack JSON copied to clipboard.${repoHint}`, { type: "success" });
            })
            .catch(() => BdApi.UI.showToast("Couldn't copy to clipboard", { type: "error" }));
    }
    browsePacks() {
        window.open("https://github.com/ItzMeShadow999/Badges", "_blank", "noopener,noreferrer");
    }
    async importPackFromUrl() {
        const url = (this.getSetting("importPackUrl") || "").trim();
        if (!url) { BdApi.UI.showToast("Paste a pack URL first", { type: "error" }); return; }
        if (!this.packUrlLooksValid(url)) {
            BdApi.UI.showToast("Use a raw.githubusercontent.com link, not a github.com/blob/... page", { type: "error" });
            return;
        }
        let codes;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(res.statusText);
            const data = await res.json();
            codes = Array.isArray(data) ? data : (Array.isArray(data && data.badges) ? data.badges : []);
            if (!codes.length) throw new Error("empty pack");
        } catch (e) {
            BdApi.UI.showToast("Couldn't load that pack - check the URL", { type: "error" });
            return;
        }
        const list = this.getMyBadges();
        let imported = 0;
        for (const code of codes) {
            if (list.length + imported >= this.MAX_BADGES) break;
            try {
                const parsed = this.decodeBadgeCode(code);
                if (this.validateBadgePayload(parsed)) continue;
                list.push({ id: this.genBadgeId(), imageUrl: parsed.imageUrl, description: parsed.name, style: parsed.style });
                imported++;
            } catch { }
        }
        if (!imported) { BdApi.UI.showToast("No valid badges found in that pack", { type: "error" }); return; }
        this.setMyBadgesLocal(list);
        for (const entry of list.slice(-imported)) {
            await this.setMyBadge(entry.id, entry.imageUrl, entry.description);
        }
        BdApi.UI.showToast(`Imported ${imported} badge(s) from pack and saved`, { type: "success" });
    }

    hasMutualGuild(otherUserId) {
        const me = this.UserStore && this.UserStore.getCurrentUser();
        if (!me || otherUserId === me.id) return true;
        if (!this.GuildStore || !this.GuildMemberStore) return true;
        const guilds = this.GuildStore.getGuilds();
        for (const guildId of Object.keys(guilds)) {
            if (this.GuildMemberStore.isMember(guildId, me.id) && this.GuildMemberStore.isMember(guildId, otherUserId))
                return true;
        }
        return false;
    }
    shouldShowBadgeFor(userId) {
        if (!this.getSetting("restrictToMutualGuilds")) return true;
        return this.hasMutualGuild(userId);
    }

    tryPatchProfileStorePrefetch() {
        try {
            const mod = BdApi.Webpack.getModule(m => m && m.default && m.default.getUserProfile, { defaultExport: false })
                || BdApi.Webpack.getModule(m => m && m.prototype && typeof m.prototype.getUserProfile === "function");
            if (!mod) return;
            const target = mod.default && mod.default.getUserProfile ? mod.default : mod;
            if (typeof target.getUserProfile !== "function") return;
            BdApi.Patcher.after(this.name, target, "getUserProfile", (_this, args) => {
                const userId = args && args[0];
                if (!userId) return;
                const cached = this.cache.get(userId);
                const isFresh = cached && Date.now() - cached.time < this.CACHE_TTL_MS;
                if (!isFresh) this.fetchBadge(userId);
            });
        } catch (e) {
            console.warn("[CustomBadges] Prefetch patch skipped (non-fatal):", e);
        }
    }

    get badgeContainerSelectors() {
        return ['[aria-label="User Badges"]', '[class*="badgeList"]', '[class*="customStatus"] ~ [class*="badges"]', '[class*="profileBadges"]'];
    }

    getProfileRoots() {
        const roots = new Set();
        [
            '[class*="userProfileModalInner"]',
            '[class*="userProfileModal"]',
            '[class*="userPopoutInner"]',
            '[class*="userPopout"]',
            '[class*="profilePanel"]',
            '[class*="accountProfilePopoutWrapper"]',
            '[role="dialog"]'
        ].forEach(sel => document.querySelectorAll(sel).forEach(el => roots.add(el)));

        document.querySelectorAll('img[src*="/avatars/"], img[src*="/embed/avatars/"]').forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.width < 64) return;
            const p = img.closest('[class]');
            if (p) roots.add(p);
        });

        document.querySelectorAll('[class*="usernameAndPronounsRow"]').forEach(row => roots.add(row));

        document.querySelectorAll(this.badgeContainerSelectors.join(",")).forEach(el => {
            let ancestor = el;
            for (let i = 0; i < 4 && ancestor; i++) {
                if (ancestor.querySelector && ancestor.querySelector('[class*="usernameAndPronounsRow"]')) {
                    roots.add(el);
                    break;
                }
                ancestor = ancestor.parentElement;
            }
        });

        return roots;
    }

    createSynthesizedBadgeContainer() {
        const container = document.createElement("div");
        container.setAttribute("aria-label", "User Badges");
        container.setAttribute("role", "group");
        container.style.cssText = "display:inline-flex;flex-wrap:wrap;align-items:center;gap:4px;margin-left:6px;vertical-align:middle;";
        return container;
    }

    ensureRowHealer(row) {
        if (this._rowHealers.has(row)) return;
        const containerSelector = this.badgeContainerSelectors.join(",");

        const heal = () => {
            const current = this._rowHealers.get(row);
            if (!document.body.contains(row)) {
                if (current) current.disconnect();
                this._rowHealers.delete(row);
                return;
            }
            const parent = row.parentNode;
            if (!parent) return;
            if (parent.querySelector(containerSelector)) return; 

            const container = this.createSynthesizedBadgeContainer();
            const anchorUserId = this.extractUserIdFromContainer(row);
            if (anchorUserId) container.dataset.cbAnchorUserId = anchorUserId;
            parent.insertBefore(container, row.nextSibling);
            this.handleBadgeContainer(container);
        };

        const observer = new MutationObserver(heal);
        observer.observe(row.parentNode || row, { childList: true, subtree: true });
        this._rowHealers.set(row, observer);
    }

    pruneRowHealers() {
        this._rowHealers.forEach((observer, row) => {
            if (!document.body.contains(row)) {
                observer.disconnect();
                this._rowHealers.delete(row);
            }
        });
    }

    synthesizeBadgeContainers() {
        const roots = this.getProfileRoots();

        const containerSelector = this.badgeContainerSelectors.join(",");
        const debug = this.getSetting("debugLogging");
        let created = 0;

        roots.forEach(root => {
            if (root.querySelector(containerSelector)) return; 

            const usernameRow = (root.matches && root.matches('[class*="usernameAndPronounsRow"]'))
                ? root
                : root.querySelector('[class*="usernameAndPronounsRow"]');
            if (usernameRow) {
                const parent = usernameRow.parentNode;
                if (!parent) return;
                if (parent.querySelector(containerSelector)) return; 
                const container = this.createSynthesizedBadgeContainer();
                const anchorUserId = this.extractUserIdFromContainer(usernameRow) || this.extractUserIdFromContainer(root);
                if (anchorUserId) container.dataset.cbAnchorUserId = anchorUserId;
                parent.insertBefore(container, usernameRow.nextSibling);
                this.ensureRowHealer(usernameRow);
                created++;
                return;
            }

            const nameEl = root.querySelector('h1, [class*="nameTag"], [class*="nickname"]');
            if (!nameEl) return;
            const parent = nameEl.closest('div[class]') || nameEl.parentElement;
            if (!parent || !parent.parentNode) return;

            const container = document.createElement("div");
            container.setAttribute("aria-label", "User Badges");
            container.setAttribute("role", "group");
            container.style.cssText = "display:flex;flex-wrap:wrap;align-items:center;gap:4px;margin:6px 0;";

            if (parent.nextSibling) parent.parentNode.insertBefore(container, parent.nextSibling);
            else parent.parentNode.appendChild(container);
            created++;
        });

        if (debug && created) console.log(`[CustomBadges] synthesized ${created} fallback badge container(s)`);
    }

    startProfileObserver() {
        const selector = this.badgeContainerSelectors.join(",");

        let rescanQueued = false;
        let lastRescanAt = 0;
        const MIN_RESCAN_GAP_MS = 250;
        const scheduleRescan = () => {
            if (rescanQueued) return;
            rescanQueued = true;
            const run = () => {
                rescanQueued = false;
                lastRescanAt = Date.now();
                this.synthesizeBadgeContainers();
                this.pruneRowHealers();

                const roots = this.getProfileRoots();
                const matches = new Set();
                roots.forEach(root => {
                    if (root.matches && root.matches(selector)) matches.add(root);
                    root.querySelectorAll(selector).forEach(el => matches.add(el));
                });

                if (this.getSetting("debugLogging")) {
                    console.log(`[CustomBadges] rescan: selector matched ${matches.size} container(s) within ${roots.size} profile root(s)`);
                }
                matches.forEach(container => this.handleBadgeContainer(container));
            };
            const elapsed = Date.now() - lastRescanAt;
            if (elapsed >= MIN_RESCAN_GAP_MS) {
                requestAnimationFrame(run);
            } else {
                setTimeout(run, MIN_RESCAN_GAP_MS - elapsed);
            }
        };

        const isOwnNode = node => {
            if (!node || node.nodeType !== 1) return false;
            if (node.classList && node.classList.contains("cb-injected-badge")) return true;
            if (node.getAttribute && node.getAttribute("aria-label") === "User Badges") return true;
            if (node.id === "ub-dashboard-wrapper") return true;
            if (typeof node.id === "string" && node.id.startsWith("custom-sidebar-btn-")) return true;
            if (node.closest && node.closest('#ub-dashboard-wrapper, [id^="custom-sidebar-btn-"]')) return true;
            return false;
        };

        this._observer = new MutationObserver(mutations => {
            for (const mutation of mutations) {
                const added = mutation.addedNodes.length ? Array.from(mutation.addedNodes) : [];
                const removed = mutation.removedNodes.length ? Array.from(mutation.removedNodes) : [];
                if (!added.length && !removed.length) continue;
                const allOwn = added.length > 0 && added.every(isOwnNode) && removed.every(isOwnNode);
                if (allOwn) continue;
                scheduleRescan();
                return;
            }
        });
        this._observer.observe(document.body, { childList: true, subtree: true });

        this._pollIntervalId = setInterval(scheduleRescan, this.CACHE_TTL_MS);

        scheduleRescan();
    }

    getReactFiber(node) {
        if (!node) return null;
        const key = Object.keys(node).find(k => k.startsWith("__reactFiber$") || k.startsWith("__reactInternalInstance$"));
        return key ? node[key] : null;
    }

    extractUserIdFromContainer(container) {
        const debug = this.getSetting("debugLogging");

        if (container.dataset && container.dataset.cbAnchorUserId) {
            if (debug) console.log(`[CustomBadges] userId via stamped anchor: ${container.dataset.cbAnchorUserId}`);
            return container.dataset.cbAnchorUserId;
        }

        let fiber = this.getReactFiber(container);
        for (let i = 0; i < 30 && fiber; i++) {
            const props = fiber.memoizedProps;
            if (props) {
                const user = props.user || props.author || (props.profile && props.profile.user) || (props.displayProfile && props.displayProfile.user);
                if (user && user.id) {
                    if (debug) console.log(`[CustomBadges] userId via React fiber: ${user.id}`);
                    return user.id;
                }
                if (typeof props.userId === "string") {
                    if (debug) console.log(`[CustomBadges] userId via React fiber props.userId: ${props.userId}`);
                    return props.userId;
                }
            }
            fiber = fiber.return;
        }

        let node = container;
        for (let i = 0; i < 6 && node; i++) {
            const img = node.querySelector && node.querySelector('img[src*="/avatars/"], img[src*="/embed/avatars/"]');
            if (img) {
                const m = img.src.match(/\/avatars\/(\d+)\//) || img.src.match(/\/embed\/avatars\/\d+.*[?&]userId=(\d+)/);
                if (m) {
                    if (debug) console.log(`[CustomBadges] userId via avatar URL fallback: ${m[1]}`);
                    return m[1];
                }
            }
            node = node.parentElement;
        }
        if (debug) console.log("[CustomBadges] userId extraction FAILED for container:", container);
        return null;
    }

    async handleBadgeContainer(container) {
        if (!container) return;
        const debug = this.getSetting("debugLogging");

        const userId = this.extractUserIdFromContainer(container);
        if (!userId) return;
        if (debug) console.log(`[CustomBadges] handling container for userId ${userId}`);

        const existing = container.querySelector(":scope > .cb-injected-badge");

        if (this._pendingContainers.get(container) === userId) return;
        this._pendingContainers.set(container, userId);

        try {
            if (this.getSetting("hideOwnBadge")) {
                const me = this.UserStore && this.UserStore.getCurrentUser();
                if (me && userId === me.id) return;
            }
            if (!this.shouldShowBadgeFor(userId)) return;

            const data = await this.fetchBadge(userId);
            if (debug) console.log(`[CustomBadges] fetchBadge(${userId}) ->`, data);

            if (!data || !data.imageUrl) {
                container.querySelectorAll(":scope > .cb-injected-badge").forEach(el => el.remove());
                return;
            }

            if (existing && existing.dataset.cbUserId === userId && existing.dataset.cbImgSrc === data.imageUrl) {
                return;
            }

            if (!container.isConnected) { if (debug) console.log("[CustomBadges] container disconnected before append, aborting"); return; }
            if (this.extractUserIdFromContainer(container) !== userId) { if (debug) console.log("[CustomBadges] container reassigned to a different user before append, aborting"); return; }

            container.querySelectorAll(":scope > .cb-injected-badge").forEach(el => el.remove());

            const ownerFirstUsedDate = userId === (this.UserStore && this.UserStore.getCurrentUser()?.id)
                ? this.getSetting("firstUsedDate")
                : null;
            const style = this.resolveBadgeStyle(data.style, ownerFirstUsedDate);
            const rawName = (data.description || "").trim();
            const displayName = this.formatBadgeName(rawName, style.appendTag);
            const radius = style.iconShape === "circle" ? "50%" : style.iconShape === "rounded" ? "6px" : "0";
            const ownerUsername = (this.UserStore && this.UserStore.getUser && this.UserStore.getUser(userId)?.username) || "unknown";

            const img = document.createElement("img");
            img.src = data.imageUrl;
            img.alt = displayName;
            img.referrerPolicy = "no-referrer";
            img.className = "cb-badge-img cb-injected-badge";
            img.dataset.cbUserId = userId;
            img.dataset.cbImgSrc = data.imageUrl;
            if (style.hoverEffect === "scale") img.classList.add("cb-hover-scale");
            if (style.hoverEffect === "glow") img.classList.add("cb-hover-glow");
            Object.assign(img.style, {
                width: `${style.iconSize}px`,
                height: `${style.iconSize}px`,
                borderRadius: radius,
                marginLeft: "4px"
            });

            if (style.hoverEffect === "scale") {
                img.addEventListener("mouseenter", () => { img.style.transform = "scale(1.15)"; });
                img.addEventListener("mouseleave", () => { img.style.transform = ""; });
            } else if (style.hoverEffect === "glow") {
                img.addEventListener("mouseenter", () => { img.style.filter = `drop-shadow(0 0 6px ${style.glowColor})`; });
                img.addEventListener("mouseleave", () => { img.style.filter = ""; });
            }

            if (this.getSetting("showTooltip")) {
                BdApi.UI.createTooltip(img, displayName, { side: "top" });
            }

            if (this.getSetting("showPopup")) {
                img.classList.add("cb-clickable");
                img.addEventListener("click", e => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (this._popupOpenFor === img) {
                        this.hidePopup();
                    } else {
                        this.showBadgePopup(img, data.imageUrl, rawName, ownerUsername, style);
                    }
                });
            }

            if (!container.isConnected || this.extractUserIdFromContainer(container) !== userId) return;
            container.appendChild(img);
            if (debug) console.log(`[CustomBadges] appended badge img for ${userId} into`, container);
        } finally {
            if (this._pendingContainers.get(container) === userId) {
                this._pendingContainers.delete(container);
            }
        }
    }

    Row(children, style) { return this.h("div", { style: Object.assign({ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }, style || {}) }, children); }

    Field(label, description, control) {
        const h = this.h;
        return h("div", { style: { marginBottom: 16 } },
            h("div", { style: { fontWeight: 600, marginBottom: 4, fontSize: 13 } }, label),
            description && h("div", { style: { fontSize: 12, opacity: 0.7, marginBottom: 6 } }, description),
            control
        );
    }

    TextField(value, placeholder, onChange, opts) {
        const h = this.h;
        const type = (opts && opts.type) || "text";
        return h("input", {
            type, value: value || "", placeholder: placeholder || "",
            onChange: e => onChange(e.target.value),
            style: {
                width: "100%", padding: "8px 10px", borderRadius: 4,
                border: "1px solid var(--background-tertiary, #1e1f22)",
                background: "var(--input-background, #1e1f22)",
                color: "var(--text-normal, #dcddde)", fontSize: 14
            }
        });
    }

    SelectField(value, options, onChange) {
        const h = this.h;
        return h("select", {
            value, onChange: e => onChange(e.target.value),
            style: {
                width: "100%", padding: "8px 10px", borderRadius: 4,
                border: "1px solid var(--background-tertiary, #1e1f22)",
                background: "var(--input-background, #1e1f22)",
                color: "var(--text-normal, #dcddde)", fontSize: 14
            }
        }, options.map(o => h("option", { key: o.value, value: o.value }, o.label)));
    }

    SwitchField(label, description, checked, onChange) {
        const h = this.h;
        return h("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 16 } },
            h("div", null,
                h("div", { style: { fontWeight: 600, marginBottom: 2, fontSize: 13 } }, label),
                description && h("div", { style: { fontSize: 12, opacity: 0.7 } }, description)
            ),
            h("label", { style: { position: "relative", display: "inline-block", width: 40, height: 22, flexShrink: 0 } },
                h("input", {
                    type: "checkbox", checked: !!checked, onChange: e => onChange(e.target.checked),
                    style: { opacity: 0, width: 0, height: 0 }
                }),
                h("span", {
                    style: {
                        position: "absolute", cursor: "pointer", inset: 0,
                        background: checked ? "#5865F2" : "#4e5058",
                        borderRadius: 22, transition: "0.15s"
                    }
                },
                    h("span", {
                        style: {
                            position: "absolute", height: 16, width: 16, left: checked ? 21 : 3, top: 3,
                            background: "#fff", borderRadius: "50%", transition: "0.15s"
                        }
                    })
                )
            )
        );
    }

    Button(label, onClick, opts) {
        const h = this.h;
        const o = opts || {};
        return h("button", {
            onClick, disabled: !!o.disabled,
            style: {
                padding: "8px 14px", borderRadius: 4, border: "none", cursor: o.disabled ? "default" : "pointer",
                background: o.danger ? "#da373c" : (o.primary ? "#5865F2" : "#4e5058"),
                color: "#fff", fontSize: 13, fontWeight: 600, opacity: o.disabled ? 0.5 : 1
            }
        }, label);
    }

    Divider() {
        return this.h("hr", { style: { border: "none", borderTop: "1px solid var(--background-modifier-accent, #3a3c43)", margin: "20px 0" } });
    }

    SessionTokenInput() {
        const h = this.h;
        const React = this.React;
        const self = this;
        const [value, setValue] = React.useState(self.getSetting("sessionToken") || "");
        const [visible, setVisible] = React.useState(false);

        function commit(v) { setValue(v); self.setSetting("sessionToken", v); }

        return h("div", { style: { display: "flex", gap: 8 } },
            self.TextField(value, "Paste your session token here", commit, { type: visible ? "text" : "password" }),
            self.Button(visible ? "Hide" : "Show", () => setVisible(!visible))
        );
    }

    RevokeTokenButton() {
        const h = this.h;
        const React = this.React;
        const self = this;
        const [busy, setBusy] = React.useState(false);
        async function doRevoke() {
            setBusy(true);
            try { await self.revokeSessionToken(); } finally { setBusy(false); }
        }
        return self.Button(busy ? "Revoking..." : "Revoke Your Token", doRevoke, { danger: true, disabled: busy || !self.getSetting("sessionToken") });
    }

    BadgePreview() {
        const h = this.h;
        const React = this.React;
        const self = this;
        const [, bump] = React.useReducer(x => x + 1, 0);
        React.useEffect(() => {
            const id = setInterval(() => bump(), 400);
            return () => clearInterval(id);
        }, []);
        const imageUrl = self.getSetting("myBadgeImageUrl");
        const name = self.getSetting("myBadgeName");
        const style = self.getMyBadgeStyle();
        if (!imageUrl || !name) {
            return h("div", { style: { fontSize: 12, opacity: 0.6, padding: "6px 0" } }, "Set your badge image and name above to see a live preview");
        }
        const radius = style.iconShape === "circle" ? "50%" : style.iconShape === "rounded" ? "6px" : "0";
        const displayName = self.formatBadgeName(name, style.appendTag);
        return h("div", { style: { display: "flex", flexDirection: "column", gap: 10, padding: "6px 0" } },
            h("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
                h("img", { src: imageUrl, alt: displayName, style: { width: style.iconSize, height: style.iconSize, objectFit: "contain", borderRadius: radius } }),
                h("span", { style: { fontSize: 12, color: "#b5bac1" } }, "Badge row icon")
            ),
            self.getSetting("showTooltip") && h("div", { style: { fontSize: 12, color: "#949ba4" } },
                "Tooltip on hover: ", h("span", { style: { fontWeight: 700, color: style.nameColor } }, displayName))
        );
    }

    MyBadgesList() {
        const h = this.h;
        const React = this.React;
        const self = this;
        const [, bump] = React.useReducer(x => x + 1, 0);
        const badges = self.getMyBadges();
        const activeId = self.getActiveBadgeId();
        if (!badges.length) {
            return h("div", { style: { fontSize: 12, opacity: 0.7 } }, "No badges yet - set an image/name above or add a new slot.");
        }
        return h("div", { style: { display: "flex", flexDirection: "column", gap: 6 } },
            badges.map(b => h("div", {
                key: b.id,
                style: {
                    display: "flex", alignItems: "center", gap: 10, padding: "6px 10px", borderRadius: 6,
                    border: b.id === activeId ? "1px solid #5865F2" : "1px solid transparent",
                    background: b.id === activeId ? "rgba(88,101,242,0.12)" : "rgba(255,255,255,0.04)"
                }
            },
                h("img", { src: b.imageUrl, alt: b.description, referrerPolicy: "no-referrer", style: { width: 24, height: 24, objectFit: "contain", borderRadius: 4, flexShrink: 0 } }),
                h("span", { style: { flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, b.description + (b.id === activeId ? " (active)" : "")),
                b.id !== activeId && self.Button("Use", () => self.switchToBadge(b.id).then(() => bump()), { }),
                self.Button("Delete", () => self.deleteBadgeSlot(b.id).then(() => bump()), { danger: true })
            ))
        );
    }

    SettingsRoot() {
        const h = this.h;
        const React = this.React;
        const self = this;
        const [, bump] = React.useReducer(x => x + 1, 0);
        const forceUpdate = () => bump();
        const hasBadge = !!(self.getSetting("myBadgeImageUrl") && self.getSetting("myBadgeName"));
        const hoverEffect = self.getSetting("badgeHoverEffect");

        return h("div", { style: { padding: "4px 2px 24px" } },
            h("h2", { style: { fontSize: 20, marginBottom: 8 } }, "Custom Badges"),
            h("p", { style: { fontSize: 13, opacity: 0.8, marginBottom: 16 } },
                "Adds a self-hosted custom badge with a hover tooltip, visible to anyone else running this plugin."),

            h("h3", null, "Dashboard"),
            self.SwitchField("Show Dashboard Button", "Show the \"User Dashboard\" entry in the DM sidebar. Turn this off to hide the dashboard entirely - flip it back on here to bring it back.",
                self.getSetting("showDashboardButton"), v => { self.setSetting("showDashboardButton", v); self.setDashboardButtonVisible(v); forceUpdate(); }),

            self.Divider(),
            h("h3", null, "Account Verification"),
            h("p", { style: { fontSize: 12, opacity: 0.75, marginBottom: 12 } },
                "Prove you own this Discord account so the server accepts badge changes as coming from you. No passwords or long-lived Discord tokens are ever stored - just a short-lived, revocable proof."),
            self.Field("Verify Discord Account", null, self.Button("Verify Discord Account", () => self.verifyDiscordAccount())),
            self.Field("Session Token", "Paste the session token shown after verifying your account here.", self.h(self.SessionTokenInput.bind(self))),
            self.Field("Revoke Token", "Revoke your current session token immediately.", self.h(self.RevokeTokenButton.bind(self))),

            self.Divider(),
            h("h3", null, "Edit Active Badge"),
            self.Field("Api Base Url", "Worker URL used to fetch/set badges.", self.TextField(self.getSetting("apiBaseUrl"), self.DEFAULT_API_BASE, v => { self.setSetting("apiBaseUrl", v); forceUpdate(); })),
            self.Field("My Badge Image Url", "Must be hosted on i.imgur.com, i.ibb.co, i.pinimg.com, files.catbox.moe, cdn.discordapp.com, or media.discordapp.net.",
                self.TextField(self.getSetting("myBadgeImageUrl"), "", v => { self.setSetting("myBadgeImageUrl", v); if (!self.suppressPublishOnChange) self.updateMyBadgeFromSettings(); forceUpdate(); })),
            self.Field("My Badge Name", "Shown in the hover tooltip.",
                self.TextField(self.getSetting("myBadgeName"), "", v => { self.setSetting("myBadgeName", v); if (!self.suppressPublishOnChange) self.updateMyBadgeFromSettings(); forceUpdate(); })),

            self.Divider(),
            h("h3", null, "Live Preview"),
            h(self.BadgePreview.bind(self)),

            self.Divider(),
            h("h3", null, "Quick Actions"),
            self.Row([
                self.Button("Share Badge", () => self.shareMyBadge(), { disabled: !hasBadge }),
                self.Button("Revert To Previous Badge", () => self.revertBadge(), { primary: true }),
                self.Button("Refresh Badge Cache", () => self.refreshBadgeCache(), { primary: true })
            ], { marginBottom: 16 }),

            self.Field("Import Badge Code", "Paste a badge code you received from someone else here, then hit Import Badge below.",
                self.TextField(self.getSetting("importBadgeCode"), "", v => { self.setSetting("importBadgeCode", v); forceUpdate(); })),
            self.Row([self.Button("Import Badge", () => { self.importBadgeFromCode(); forceUpdate(); })], { marginBottom: 16 }),

            self.Field("Selected Preset", "Choose a built-in badge preset, then hit Apply Preset below.",
                self.SelectField(self.getSetting("selectedPreset"), self.BUILTIN_PRESETS.map((p, i) => ({ label: p.label, value: String(i) })),
                    v => { self.setSetting("selectedPreset", v); forceUpdate(); })),
            self.Row([self.Button("Apply Preset", () => { self.applySelectedPreset(); forceUpdate(); })], { marginBottom: 16 }),

            self.Divider(),
            h("h3", null, "My Badges"),
            h("p", { style: { fontSize: 12, opacity: 0.75, marginBottom: 12 } },
                `Your saved badge slots. Click "Use" on any badge to make it active and publish it. Add a new slot to build another look - you can have up to ${self.MAX_BADGES}.`),
            h(self.MyBadgesList.bind(self)),
            self.Row([self.Button("+ New Badge Slot", () => { self.createNewBadgeSlot(); forceUpdate(); })], { marginTop: 10 }),

            self.Divider(),
            h("h3", null, "Badge Packs"),
            h("p", { style: { fontSize: 12, opacity: 0.75, marginBottom: 12 } },
                "Import a pack of badges from a raw GitHub URL, or export your current badges as a pack to share with others."),
            self.Field("Import Pack from URL", "Raw GitHub URL to a badge pack JSON file (use raw.githubusercontent.com, not a github.com/blob/... page).",
                self.TextField(self.getSetting("importPackUrl"), "https://raw.githubusercontent.com/you/repo/main/packs/friend-group.json", v => { self.setSetting("importPackUrl", v); forceUpdate(); })),
            self.Row([
                self.Button("Import Pack", () => { self.importPackFromUrl().then(() => forceUpdate()); }),
                self.Button("Make Pack (Copy JSON)", () => self.makePack(), { primary: true }),
                self.Button("Add More Packs", () => self.browsePacks(), { primary: true })
            ], { marginBottom: 16 }),
            self.Field("Pack Repo Url", "GitHub repo URL used by Make Pack / Add More Packs for guidance/links.",
                self.TextField(self.getSetting("packRepoUrl"), self.DEFAULT_PACKS_REPO_URL, v => { self.setSetting("packRepoUrl", v); forceUpdate(); })),

            self.Divider(),
            h("h3", null, "Behavior"),
            self.SwitchField("Show Tooltip", "Show a small tooltip when hovering a custom badge.", self.getSetting("showTooltip"), v => { self.setSetting("showTooltip", v); forceUpdate(); }),
            self.SwitchField("Append Tag", "Add a [BD] suffix after your badge name. Seen by everyone who views your badge.", self.getSetting("appendTag"), v => { self.setSetting("appendTag", v); if (!self.suppressPublishOnChange) self.updateMyBadgeFromSettings(); forceUpdate(); }),
            self.SwitchField("Hide Own Badge", "Don't show my own badge to myself when viewing my own profile.", self.getSetting("hideOwnBadge"), v => { self.setSetting("hideOwnBadge", v); forceUpdate(); }),
            self.SwitchField("Restrict to Mutual Servers", "Only show custom badges on profiles of people who share at least one server with you.", self.getSetting("restrictToMutualGuilds"), v => { self.setSetting("restrictToMutualGuilds", v); forceUpdate(); }),

            self.Divider(),
            h("h3", null, "Badge Style"),
            self.Field("Badge Name Color", "Text color for your badge name (hex).",
                self.TextField(self.getSetting("badgeNameColor"), "#ffffff", v => { self.setSetting("badgeNameColor", v); if (!self.suppressPublishOnChange) self.updateMyBadgeFromSettings(); forceUpdate(); })),
            self.Field("Badge Icon Size", "Size in pixels of your badge icon in the badge row.",
                self.TextField(String(self.getSetting("badgeIconSize")), "22", v => { const n = Number(v); self.setSetting("badgeIconSize", Number.isNaN(n) ? self.DEFAULTS.badgeIconSize : n); if (!self.suppressPublishOnChange) self.updateMyBadgeFromSettings(); forceUpdate(); })),
            self.Field("Badge Icon Shape", "Shape of your badge icon in the badge row.",
                self.SelectField(self.getSetting("badgeIconShape"), [{ label: "Circle", value: "circle" }, { label: "Rounded square", value: "rounded" }, { label: "Square", value: "square" }],
                    v => { self.setSetting("badgeIconShape", v); if (!self.suppressPublishOnChange) self.updateMyBadgeFromSettings(); forceUpdate(); })),
            self.Field("Badge Hover Effect", "Effect when someone hovers your badge icon in the badge row.",
                self.SelectField(hoverEffect, [{ label: "None", value: "none" }, { label: "Scale up", value: "scale" }, { label: "Glow", value: "glow" }],
                    v => { self.setSetting("badgeHoverEffect", v); if (!self.suppressPublishOnChange) self.updateMyBadgeFromSettings(); forceUpdate(); })),
            hoverEffect === "glow" && self.Field("Badge Glow Color", "Glow color used when Badge Hover Effect is set to Glow (hex).",
                self.TextField(self.getSetting("badgeGlowColor"), "#ffffff", v => { self.setSetting("badgeGlowColor", v); if (!self.suppressPublishOnChange) self.updateMyBadgeFromSettings(); forceUpdate(); })),

            self.Divider(),
            self.Button("Refresh Badge Cache", () => self.refreshBadgeCache())
        );
    }

    getSettingsPanel() {
        const container = document.createElement("div");
        const element = this.h(this.SettingsRoot.bind(this));

        if (BdApi.ReactDOM && typeof BdApi.ReactDOM.createRoot === "function") {
            const root = BdApi.ReactDOM.createRoot(container);
            root.render(element);
            this._settingsRoot = root;
        } else if (BdApi.ReactDOM && typeof BdApi.ReactDOM.render === "function") {
            BdApi.ReactDOM.render(element, container);
        } else {
            console.error(`[${this.name}] No usable BdApi.ReactDOM render method found.`);
        }

        return container;
    }
};