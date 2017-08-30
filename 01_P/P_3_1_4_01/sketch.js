// P_3_1_4_01
//
// Generative Gestaltung, ISBN: 978-3-87439-759-9
// First Edition, Hermann Schmidt, Mainz, 2009
// Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
// Copyright 2009 Hartmut Bohnacker, Benedikt Gross, Julia Laub, Claudius Lazzeroni
//
// http://www.generative-gestaltung.de
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * counting the words of a text and display them in a treemap diagram.
 *
 * KEYS
 * r                   : toggle random mode
 * h                   : only horizontal rows
 * v                   : only vertical rows
 * b                   : both kind of rows
 * s                   : save png
 */
'use strict';

var joinedText;

var treemap;

var font;
var maxFontSize = 1000;
var minFontSize = 1;

var doSort = true;
var rowDirection = 'both';

function preload() {
  font = loadFont('data/miso-bold.ttf');
  joinedText = loadStrings('data/pride_and_prejudice_short.txt');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //createCanvas(windowWidth, round(windowWidth*1.343));

  joinedText = joinedText.join(' ');
  // If you want to get rid of all number chars too, just uncomment the following line
  // joinedText = joinedText.replace(/\d+/g, '');
  var words = joinedText.match(/\w+/g);

  treemap = new Treemap(1, 1, width - 3, height - 3, {sort:doSort, direction:rowDirection});

  // count words
  for (var i = 0; i < words.length; i++) {
    var w = words[i].toLowerCase();
    treemap.addData(w);
  }

  treemap.init();
}

function draw() {
  background(255);
  textAlign(CENTER, BASELINE);

  for (var i = 0; i < treemap.items.length; i++) {
    var r = treemap.items[i];

    fill(255);
    stroke(0);
    strokeWeight(1);
    rect(r.x, r.y, r.w, r.h);

    var word = treemap.items[i].data;
    textFont(font, 100);
    var textW = textWidth(word);
    var fontSize = 100 * (r.w * 0.9) / textW;
    fontSize = min(fontSize, (r.h * 0.9));
    textFont(font, fontSize);

    fill(0);
    noStroke();
    text(word, r.x + r.w / 2, r.y + r.h * 0.8);
  }

  noLoop();
}

function keyTyped() {
  // export png
  if (key == 's' || key == 'S') saveCanvas(gd.timestamp(), 'png');

  if (key == 'r' || key == 'R') {
    doSort = !doSort;
    treemap.options.sort = doSort;
    treemap.init();
    loop();
  }
  if (key == 'h' || key == 'H') {
    rowDirection = 'horizontal';
    treemap.options.direction = rowDirection;
    treemap.init();
    loop();
  }
  if (key == 'v' || key == 'V') {
    rowDirection = 'vertical';
    treemap.options.direction = rowDirection;
    treemap.init();
    loop();
  }
  if (key == 'b' || key == 'B') {
    rowDirection = 'both';
    treemap.options.direction = rowDirection;
    treemap.init();
    loop();
  }
}


