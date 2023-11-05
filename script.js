"use strict";

const usernameInput = document.getElementById("username-input");
const usernameH3 = document.getElementById("username");
const nameIntroduceBox = document.getElementById("name-introduce");
const presentationBox = document.getElementById("presentation");
const avatarSelectorBox = document.getElementById("avatar-selector");
const buttonIntroduceName = document.getElementById("button-introduce-name");
buttonIntroduceName.addEventListener("click",welcome);

const hatContainer = document.getElementById("hat-container");
const bodyContainer = document.getElementById("body-container");
const faceContainer = document.getElementById("face-container");
const shoesContainer = document.getElementById("shoes-container");

const hatDisplay = document.getElementById("hat-display");
const bodyDisplay = document.getElementById("body-display");
const faceDisplay = document.getElementById("face-display");
const shoesDisplay = document.getElementById("shoes-display");

let username = readCookieValue("user");
if (username != undefined) {
	usernameH3.textContent = username;
	nameIntroduceBox.style.width = "0%";
	avatarSelectorBox.style.width = "100%";
	avatarSelectorBox.style.opacity = "1";
}

if (readCookieValue("hat") != undefined) {
	hatDisplay.style.backgroundImage = readCookieValue("hat");
	bodyDisplay.style.backgroundImage = readCookieValue("body");
	faceDisplay.style.backgroundImage = readCookieValue("face");
	shoesDisplay.style.backgroundImage = readCookieValue("shoes");
}

// ---- FUNCTIONS ----

function welcome() {
	username = usernameInput.value;
	createCookie("user="+username,365);
	usernameH3.textContent = username;
	nameIntroduceBox.style.animation = "1s ease forwards hide";
	nameIntroduceBox.style.opacity = "0";
	setTimeout(()=>presentationBox.style.animation = "2s ease forwards show",1000);
	setTimeout(()=>{
		const spans = presentationBox.children;
		for (let i in spans) {
			if (i.length < 3) setTimeout(()=>spans[i].style.animation = "1.2s ease forwards upLetter",100*i);
		}
	},2000);
	setTimeout(()=>presentationBox.style.animation = "1.4s ease forwards hide",4000);
	setTimeout(()=>avatarSelectorBox.style.animation = "1.4s ease forwards show",5400);
	setTimeout(()=>avatarSelectorBox.style.opacity = "1",6000);
	buttonIntroduceName.removeEventListener("click",welcome);
}

function createAllItems(num) {
	for(let i = 0; i < num; i++) { createItem("hat",i,hatContainer) }
	for(let i = 0; i < num; i++) { createItem("body",i,bodyContainer) }
	for(let i = 0; i < num; i++) { createItem("face",i,faceContainer) }
	for(let i = 0; i < num; i++) { createItem("shoes",i,shoesContainer) }
}

function createItem(type,i,container) {
	const item = document.createElement("div");
	item.classList.add("item-button");
	item.id = type+(i+1);
	item.style.backgroundImage = "url(images/"+type+"/"+type+(i+1)+".png)";
	item.addEventListener("click",()=>selectItem(type,i,item));
	container.appendChild(item);
}

function selectItem(type,i,item) {
	const allItems = document.querySelectorAll("#"+type+"-container > div");
	for (let j in allItems) {
		if (typeof allItems[j] == "object")	allItems[j].classList.remove("selected");
	}
	item.classList.add("selected");
	const display = document.getElementById(type+"-display");
	display.style.backgroundImage = "url(images/"+type+"/"+type+(i+1)+".png)";
}

createAllItems(6);

// Cookies

function createCookie(value,days) {
	const d = new Date(); //Creates an UTC date of expiration
	d.setTime(d.getTime() + (days*24*60*60*1000));
	const expires = "expires="+d.toUTCString();
	document.cookie = value+";"+expires; //Creates the cookie
}

function readCookieValue(name) {
	let cookies = document.cookie;
	cookies = cookies.split(";");
	for (let i in cookies) {
		const cookie = cookies[i].trim();
		if (cookie.startsWith(name)) return cookie.split("=")[1];
	}
}

window.addEventListener("beforeunload",()=>{
	const hat = window.getComputedStyle(hatDisplay).getPropertyValue("background-image");
	const body = window.getComputedStyle(bodyDisplay).getPropertyValue("background-image");
	const face = window.getComputedStyle(faceDisplay).getPropertyValue("background-image");
	const shoes = window.getComputedStyle(shoesDisplay).getPropertyValue("background-image");
	createCookie("hat="+hat,365);
	createCookie("body="+body,365);
	createCookie("face="+face,365);
	createCookie("shoes="+shoes,365);
});