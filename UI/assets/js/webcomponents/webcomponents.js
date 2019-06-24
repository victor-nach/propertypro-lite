/**
 * @name property-mini 
 * @description creates a card setup layout for listed properties with minimal information
 * @slot { name = 'one' } contains the properties' name
 */
fetch("assets/templates/property-mini.html")
    .then(response => response.text())
    .then(data =>
        customElements.define("property-mini", class extends HTMLElement {
            constructor() {
                super()
                this.attachShadow({ mode: 'open' });
                const template = document.createElement('template');
                template.innerHTML = data;
                this.shadowRoot.appendChild(template.content.cloneNode(true))
            }
        })
    )

/**
 * @name join-us
 * @description a parallax mini section with a button to sign up
 */
fetch("assets/templates/join-us.html")
    .then(response => response.text())
    .then(data =>
        customElements.define("join-us", class extends HTMLElement {
            constructor() {
                super()
                this.attachShadow({ mode: 'open' });
                const template = document.createElement('template');
                template.innerHTML = data;
                this.shadowRoot.appendChild(template.content.cloneNode(true))
            }
        })
    )

/**
* @name my-header
* @description a parallax mini section with a button to sign up
*/
fetch("assets/templates/my-header.html")
    .then(response => response.text())
    .then(data =>
        customElements.define("my-header", class extends HTMLElement {
            constructor() {
                super()
                this.attachShadow({ mode: 'open' });
                const template = document.createElement('template');
                template.innerHTML = data;
                this.shadowRoot.appendChild(template.content.cloneNode(true));

                this.navControl = this.shadowRoot.querySelector('.nav-control > div');
                this.logInBtn = this.shadowRoot.querySelector('.signin'); 
                this.signUpBtn = this.shadowRoot.querySelector('.signup'); 

            }

            connectedCallback () {
                const body = document.body;
                const signModal = document.querySelector('sign-modal');

                this.navControl.addEventListener('click', () => {
                    this.classList.toggle('show-nav');
                });        

                this.logInBtn.addEventListener('click',(e) => {
                    e.preventDefault();
                    body.setAttribute('class', 'show-modal');
                    signModal.setAttribute('class', 'show-login');
                });

                this.signUpBtn.addEventListener('click',(e) => {
                    e.preventDefault();
                    body.setAttribute('class', 'show-modal');                    
                    signModal.setAttribute('class', 'show-signup');
                });
            }
        })
    )

/**
* @name my-footer
* @description a parallax mini section with a button to sign up
*/
fetch("assets/templates/my-footer.html")
    .then(response => response.text())
    .then(data =>
        customElements.define("my-footer", class extends HTMLElement {
            constructor() {
                super()
                this.attachShadow({ mode: 'open' });
                const template = document.createElement('template');
                template.innerHTML = data;
                this.shadowRoot.appendChild(template.content.cloneNode(true))
            }            
        })
    )

    /**
* @name sign-modal
* @description a parallax mini section with a button to sign up
*/
fetch("assets/templates/sign-modal.html")
.then(response => response.text())
.then(data =>
    customElements.define("sign-modal", class extends HTMLElement {
        constructor() {
            super()
            this.attachShadow({ mode: 'open' });
            const template = document.createElement('template');
            template.innerHTML = data;
            this.shadowRoot.appendChild(template.content.cloneNode(true));

            this.closeBtn = this.shadowRoot.querySelector('.close-btn');
            this.logInBtn = this.shadowRoot.querySelector('.show-login'); 
            this.signUpBtn = this.shadowRoot.querySelector('.show-signin'); 
        }

        connectedCallback () {     
            const body = document.body;  
            const signModal = document.querySelector('sign-modal'); 

            this.closeBtn.addEventListener('click',(e) => {
                e.preventDefault();                
                body.setAttribute('class', '');
            });

            this.logInBtn.addEventListener('click',(e) => {
                e.preventDefault();
                console.log('a');  
                signModal.setAttribute('class', 'show-login');
            });

            this.signUpBtn.addEventListener('click',(e) => {
                e.preventDefault();            
                   
                signModal.setAttribute('class', 'show-signup');
            });            
        }
    })
)