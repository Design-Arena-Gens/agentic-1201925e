(function(){
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  if (!button) return;

  function isDark(){
    return root.classList.contains('dark');
  }

  function applyAria(){
    const dark = isDark();
    button.setAttribute('aria-pressed', String(dark));
    button.querySelector('.icon').textContent = dark ? '☀️' : '🌙';
    button.querySelector('.label').textContent = dark ? 'Light mode' : 'Dark mode';
  }

  function setTheme(dark){
    if (dark) {
      root.classList.add('dark');
      localStorage.setItem('theme','dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme','light');
    }
    applyAria();
  }

  button.addEventListener('click', function(){
    setTheme(!isDark());
  });

  // Sync with system changes dynamically
  try {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    mq.addEventListener?.('change', (e)=>{
      const stored = localStorage.getItem('theme');
      if (!stored) setTheme(e.matches);
    });
  } catch (e) {}

  // Initialize ARIA state
  applyAria();
})();
