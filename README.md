TicTac
======

This is an implementation of Donald Michie's Machine Educable Noughts And Crosses Engine (MENACE) in Javascript.

You play against the AI. You place your piece first. 
The AI starts playing at random, but it learns from its mistakes and eventually it will always tie or win.
If you close the browser tab, the AI forgets everything it learned.

How does it work?
=================
See http://en.wikipedia.org/wiki/Donald_Michie

Each unique board state is represented in memory and a probability of success given to each possible move. If the move leads to a loss, its probability is reduced to 0. If the move leads to a win, it's probability is increased. Eventually, the probability of the AI playing a losing game becomes 0.

Unlique MENACE, the AI considers a rotation of the board as a different state. So it has 3^9 = 19,683 states instead of the 300+ states MENACE has. 
