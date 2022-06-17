(function () {

  

    // Grab body node
    const bodyNode = document.querySelector('body');
  
    // Replace the styles with the glow theme
    const initNeonDreams = (disableGlows, obs) => {
      var themeStyleTag = document.querySelector('.vscode-tokens-styles');

      alert('############# helllllloooooo [' + themeStyleTag + ']');
  
      if (!themeStyleTag) {
        return;
      }
  
      var initialThemeStyles = themeStyleTag.innerText;
      
      var updatedThemeStyles = initialThemeStyles;
      
 
      /* append the remaining styles */
      updatedThemeStyles = `${updatedThemeStyles}[CHROME_STYLES]`;
  
      const newStyleTag = document.createElement('style');
      newStyleTag.setAttribute("id", "synthwave-x-fluoromations-theme-styles");
      newStyleTag.innerText = updatedThemeStyles.replace(/(\r\n|\n|\r)/gm, '');
      document.body.appendChild(newStyleTag);
      
      console.log('Synthwave x Fluoromachine: EPIC ANIMATIONS initialised!');
      
      // disconnect the observer because we don't need it anymore
      if (obs) {
        obs.disconnect();
      }
    };
  
    // Callback function to execute when mutations are observed
    const watchForBootstrap = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            if (mutation.type === 'attributes') {
              // only init if we're using a Synthwave x Fluoromachine & epic animations subtheme
              const isUsingSynthwave = document.querySelector('[class*="TheCodemonkey-synthwave-x-fluoromachine-epic-animations-themes"]');
              // does the style div exist yet?
              const tokensLoaded = document.querySelector('.vscode-tokens-styles');
              // does it have content ?
              const tokenStyles = document.querySelector('.vscode-tokens-styles').innerText;
  
              alert('############# attributes [' + isUsingSynthwave + ', ' + tokensLoaded + ']' + document.querySelector('body').innerHTML);
  

              // sometimes VS code takes a while to init the styles content, so stop this observer and add an observer for that
              if (isUsingSynthwave && tokensLoaded) {
                initNeonDreams([], observer);
                
                observer.disconnect();
                observer.observe(tokensLoaded, { childList: true });
              }
            }
            if (mutation.type === 'childList') {
              const isUsingSynthwave = document.querySelector('[class*="TheCodemonkey-synthwave-x-fluoromachine-epic-animations-themes"]');
              const tokensLoaded = document.querySelector('.vscode-tokens-styles');
              const tokenStyles = document.querySelector('.vscode-tokens-styles').innerText;
  
              alert('############# childList [' + isUsingSynthwave + ', ' + tokensLoaded + ', ' + tokenStyles + ']');

              // Everything we need is ready, so initialise
              if (isUsingSynthwave && tokensLoaded && tokenStyles) {
                  initNeonDreams([], observer);
              }
            }
        }
    };
  
    // try to initialise the theme
    initNeonDreams([]);
  
    // Use a mutation observer to check when we can bootstrap the theme
    const observer = new MutationObserver(watchForBootstrap);
    observer.observe(bodyNode, { attributes: true });
  
  })();