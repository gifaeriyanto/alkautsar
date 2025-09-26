export const GlobalStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
      
      html, body {
        overflow: hidden !important;
        height: 100vh !important;
        width: 100vw !important;
        margin: 0 !important;
        padding: 0 !important;
        background-color: #D69E2E !important; /* orange.500 */
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        font-feature-settings: 'liga' 1, 'kern' 1;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      * {
        box-sizing: border-box;
      }
      
      .prayer-column {
        transition: all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      }
      
      .prayer-column.active {
        opacity: 1 !important;
      }
      
      .prayer-column.inactive {
        opacity: 0.3 !important;
      }
      
      .mono-time {
        font-family: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
        font-weight: 500;
        font-feature-settings: 'tnum' 1;
        letter-spacing: -0.02em;
      }
    `}
  </style>
)
