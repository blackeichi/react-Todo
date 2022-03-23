import { createGlobalStyle } from "styled-components";
import ToDoList from "./components/ToDoList";
import "./App.css";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-weight: 300;
  font-family: 'Source Sans Pro', sans-serif;
  background-color:grey;
  color:white;
  line-height: 1.2;
  width : 100%;
  font-family: 'Red Hat Mono', monospace;
}
a {
  text-decoration:none;
  color:inherit;
}
button{
  background-color: rgba(255, 255, 255, 0.5);
  border: none;
  border-top: 1px solid black;
  height: 30px;
  cursor: pointer;
  border-radius: 5px;
  margin-top: 2px;
  color: rgba(0, 0, 0, 0.7);
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
}
div{
  border-radius : 5px;
  border : 1px solid rgba(0, 0, 0, 0.7);
}
button{
  height: 40px;
  padding: 0 10px;
  cursor: pointer;
}
input{
  margin : 5px 0;
  height: 40px;
  border-radius: 5px;
  padding: 0 10px;
  color: white;
  background-color: rgba(0, 0, 0, 0.3);
  border : 1px solid rgba(0, 0, 0, 0.7);
}
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <ToDoList />
    </>
  );
}

export default App;
