<?php
define("ROOT", dirname(__DIR__));

const WWW = ROOT . "/public";
const CORE = ROOT . "/core";
const CONFIG = ROOT . "/config";
const APP = ROOT . "/app";
const CONTROLLES = APP . "/controllers";
const VIEWS = APP . "/views";
const COMPONENTS = VIEWS . "/components";
const ERRORS = VIEWS . "/errors";
const ERRORS_LOG_FILE = ROOT . "/db_errors.log";
const BOT_COMMANDS = APP . "/controllers/bot/Commands";

const PATH = "http://localhost:8080";