/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          black:'#1B1B1B',
          lightpurple: "#A494B0",
          nav:'#FFDC9D',
          beige: "#FFF3DD",
          beige10: "#fff5dd ",
          beige20: "#fffbf1",
          skyblue: "#E0F4FF",
          skyblue10:"#fafdff",
          skyblue20:"#dde9ff",
          skyblue30:"#ddfff3",
          subpuple: "#B893F5",
          subpuple10: "#e2ddff",
          orange:"#FFE197",
          green:"#A8D885",
          lightgray:"#808080",
          "text-black": "#505050",
          "text-gray": "#9D9D9D",
          "text-lightgray": "#808080",
        },
        gridTemplateColumns: {
          mainLayout: "150px 152px repeat(10, 1fr)",
        },
        animation: {
          wiggle: 'wiggle 1s ease-in-out infinite',
        },
        backgroundImage:{
          'luffybg': "url('./src/assets/luffy_bg.png')",
        }
      },
      fontFamily: {
        light : ["NotoSansKR-Medium"],
        bold : ["NotoSansKR-Bold"],
        extraBold : ["NotoSansKR-Black"],
        gamja : ["GamjaFlower-Regular"]
      },
      keyframes: {
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-10%)',
            'animation-timing-function': 'cubic-bezier(0.8,0,1,1)',
          },
          '50%': {
            transform: 'none',
            'animation-timing-function': 'cubic-bezier(0,0,0.2,1)',
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
    },
    plugins: [require("daisyui")],
  };
  