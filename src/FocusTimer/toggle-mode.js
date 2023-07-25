const btnMode = document.getElementById('toggle-mode');
let isDarkMode = false;

btnMode.addEventListener('click', (event) => {
  const mode = isDarkMode ? 'dark' : 'light';

  document.documentElement.classList.toggle('dark');

  event.currentTarget.querySelector('span').textContent = `${mode} mode ativado`;
  isDarkMode = !isDarkMode;
});