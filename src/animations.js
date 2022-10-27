
const mainTimeLine = gsap.timeline();

mainTimeLine.from(".card", {
    duration: 1,
    y: 100,
    opacity: 0,
}).from(".card-title", {
    opacity: 0,
    y: 100,
}).from(".next-btn", {
    opacity: 0,
    y: 100,
});