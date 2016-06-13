#!/bin/bash
(echo node server.js; echo node getMQTT.js) | parallel

