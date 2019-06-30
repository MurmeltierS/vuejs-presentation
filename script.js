Vue.component("presentation-timer", {
    data: function() {
        return {
            sec: 0,
            max: 600,
            started: false,
            interval: null
        }
    },
    methods: {
        add: function() {
            this.sec++;
        },
        start: function() {
            this.started = true;
            this.interval = setInterval(this.add.bind(this), 1000);
        },
        reset: function () {
          clearInterval(this.interval);
          this.started = false;
          this.sec = 0;
        }
    },
    created() {

    },
    template: '<div v-if="started" class="timer"><div class="sec" v-bind:style="{width: (sec/max)*100+\'%\'}"></div></div>'
});



Vue.component("page-pane", {
    props: ["pane"],
    template: '<pane-graphic v-if="pane.type == \'graphic\'" v-bind:h1="pane.h1" v-bind:imgsrc="pane.img"></pane-graphic><pane-main v-else-if="pane.type == \'main\'" v-bind:h1="pane.h1" v-bind:html="pane.html"></pane-main><pane-examples v-else-if="pane.type == \'examples\'" v-bind:h1="pane.h1" v-bind:html="pane.text"></pane-examples><pane-list v-else-if="pane.type == \'list\'" v-bind:h1="pane.h1" v-bind:list="pane.list"></pane-list><pane-title v-else-if="pane.type == \'title\'" v-bind:h1="pane.h1"></pane-title><pane-wotanken v-else-if="pane.type == \'wotanken\'"></pane-wotanken>'
});


Vue.component("pane-title", {
    props: ["h1"],
    template: '<div><div class="title">{{ h1 }}</div></div>'
});

Vue.component("pane-wotanken", {
    
    template: '<div style="display:flex;justify-content:center;align-items:center;"><iframe class="wotanken" src="https://kevinsieger.de/wotanken/"></iframe></div>'
});


Vue.component("pane-main", {
    props: ["h1", "html"],
    template: '<div><h1>{{ h1 }}</h1><br><div class="contents" v-html="html"></div></div>'
});

Vue.component("pane-graphic", {
    props: ["h1", "imgsrc"],
    template: '<div><h1>{{ h1 }}</h1><img class="graphic" v-bind:src="imgsrc"></div>'
});

Vue.component("pane-list", {
    props: ["h1", "list"],
    data: function() {
        return { shown: [] }
    },
    methods: {
        showOne: function() {
            this.shown.push(this.list[this.shown.length]);
            if (this.shown.length != this.list.length) {
                setTimeout(this.showOne.bind(this), 1800)
            }
        }
    },
    created() {
        setTimeout(this.showOne.bind(this), 500)
    },
    template: '<div><h1>{{ h1 }}</h1><div class="contents"><ul><transition-group name="list" tag="p"><li class="list-item" v-for="item in shown" v-bind:key="item">{{ item }}</li></transition-group></ul></div></div>'
});

Vue.component("pane-examples", {
    props: ["h1"],
    data: function() {
        return {
            message: 'Databinding erspart DOM-Zugriffe'
        };
    },
    methods: {
        reverseMsg() {
            this.message = this.message.split('').reverse().join('');
        }
    },
    template: '<div><h1>{{ h1 }}</h1><br><div class="contents"><span>{{ message }}</span><br><br><input class="dbin" v-model="message"><br><br><button @click="reverseMsg">Text umkehren</button></div></div>'
});

Vue.component("presentation-page", {
    props: ["page"],
    template: '<transition v-bind:name="$root.slide"><page-pane v-bind:style="{ background: page.style.background, color: page.style.color}" class="page" v-if="page.id == $root.pointer" v-bind:pane="page.pane"></page-pane></transition>'
});

var app = new Vue({
    el: "#app",
    data: {
        slide: 'slideleft',
        pages: [{
                id: 0,
                pane: { type: "title" },
                style: {
                    background: "#000"
                }
            },
            {
                id: 1,
                pane: { type: "title", h1: "Vue.js - Die Zukunft der Webentwicklung?" },
                style: {
                    background: "linear-gradient(120deg, #42b883, #35495e)",
                    color: "#fff"
                }
            },
            {
                id: 2,
                pane: { type: "main", h1: "Was ist Vue.js?", html: '<img src="img/vuelogo.png">' },
                style: {}
            },
            {
                id: 3,
                pane: { type: "list", h1: "Was ist Vue.js", list: ["3. häufigst verwendetes JS-Framework nach React & Angular", "nimmt grundlegende Aufgaben ab & vereinheitlicht diese", "baut Databinding nach MVVM auf \"reaktiven\" Objekten auf", "Veränderung des reaktiven Objekts löst Update der Darstellung aus"] },
                style: {}
            },
            {
                id: 4,
                pane: { type: "graphic", h1: "MVVM-Entwurfsmuster", img: 'img/mvvm.png' },
                style: {}
            },
            {
                id: 5,
                pane: { type: "graphic", h1: "im Kontext: Schichtenarchitektur", img: 'img/schichten.svg' },
                style: {}
            },
            {
                id: 6,
                pane: { type: "title", h1: "Warum Vue.js?" },
                style: { background: '#27c27c', color: '#fff' }
            },
            {
                id: 7,
                pane: { type: "list", h1: "Schneller, einfacher, best practice", list: ["mindert Aufwand", "bessere Wartbarkeit", "hervorragend dokumentiert & großes 'Ökosystem'", "performantere Ergebnisse als bei konventioneller Umsetzung", "verhältnismäßig flache Lernkurve - nach oben skalierbar"] },
                style: { background: '#27c27c', color: '#fff' }
            },
            {
                id: 8,
                pane: { type: "title", h1: "Vue.js - Ein Crashkurs" },
                style: { background: "#333", color: "#fff" }
            },
            {
                id: 9,
                pane: { type: "graphic", h1: "Vue-Instanz", img: 'img/instance.png' },
                style: { background: "#333", color: "#fff" }
            },
            {
                id: 10,
                pane: { type: "graphic", h1: "Binding-Attribut / v-bind", img: 'img/bind.png' },
                style: { background: "#333", color: "#fff" }
            },
            {
                id: 11,
                pane: { type: "graphic", h1: "Bedingte Anweisung / v-if", img: 'img/condition.png' },
                style: { background: "#333", color: "#fff" }
            },
            {
                id: 12,
                pane: { type: "graphic", h1: "Schleifen / v-for", img: 'img/loop.png' },
                style: { background: "#333", color: "#fff" }
            },
            {
                id: 13,
                pane: { type: "graphic", h1: "DOM Listener / v-on", img: 'img/click.png' },
                style: { background: "#333", color: "#fff" }
            },
            {
                id: 14,
                pane: { type: "graphic", h1: "Bidirektionales Databinding / v-model", img: 'img/model.png' },
                style: { background: "#333", color: "#fff" }
            },
            {
                id: 15,
                pane: { type: "title", h1: "Anwendungsbeispiele?" },
                style: { background: '#fff', color: '#27c27c' }
            },
            {
                id: 16,
                pane: { type: "title", h1: "Diese Präsentation!" },
                style: { background: '#fff', color: '#27c27c' }
            },


            {
                id: 17,
                pane: {
                    type: "graphic",
                    h1: "Das Model dieser Folie",
                    img: "img/slide.png"
                },
                style: {
                    color: '#27c27c',
                    background: '#fff'
                }
            },


            {
                id: 18,
                pane: { type: "examples", h1: "Was möglich ist" },
                style: { background: '#fff', color: '#27c27c' }
            },
            {
                id: 19,
                pane: { type: "wotanken" },
                style: { background: '#fff', color: '#27c27c' }
            },
            {
                id: 20,
                pane: { type: "title", h1: "nur an der Oberfläche gekratzt..." },
                style: { background: '#27c27c', color: '#fff' }
            }
            ,
            {
                id: 21,
                pane: { type: "list", h1: "Weiterführendes", list: ["Custom Components", "Server-Side Rendering", "State Management mit Vuex", "Vue Rooter", "Single-File Components mit Vue Loader"] },
                style: { background: '#27c27c', color: '#fff' }
            }
            ,
            {
                id: 22,
                pane: { type: "title", h1: "Also, die Zukunft?" },
                style: { background: '#27c27c', color: '#fff' }
            }
            ,
            {
                id: 23,
                pane: { type: "list", h1: "Quellen", list: ["Vue Guide & API - vuejs.org/v2/guide/", "Vue Mastery - vuemastery.com", "Scrimba - scrimba.com/g/glearnvue", "The State of JavaScript 2018 - stateofjs.com", "MVVM - de.wikipedia.org/wiki/Model_View_ViewModel", "Schichtenarchitektur - de.wikipedia.org/wiki/Schichtenarchitektur"] },
                style: {  }
            }
            
        ],
        pointer: 0
    },
    methods: {
        next: function() {
            this.slide = "slideleft";
            setTimeout(function() {
                if (this.pointer + 1 < this.pages.length) {
                    this.pointer++;
                    if(this.pointer == 1){
                      this.$refs.timer.start();
                    }
                }
            }.bind(this), 0);

        },
        back: function() {
            this.slide = "slideright";
            setTimeout(function() {
                if (this.pointer > 0) {
                    this.pointer--;
                    if (this.pointer == 0) {
                      this.$refs.timer.reset();
                    }
                }
            }.bind(this), 0);

        }
    },

    watch: {
        pointer: function(pointer, oldPointer) {

        }
    },
    beforeCreate() {

    },
    created() {

        window.addEventListener(
            "keyup",
            function(evt) {
                switch (evt.key) {
                    case " ":
                    case "ArrowRight":
                        this.next();
                        break;
                    case "ArrowLeft":
                        this.back();
                        break;
                }
            }.bind(this)
        );
    }
});