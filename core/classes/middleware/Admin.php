<?php

namespace myfrm\middleware;

class Admin {
  public function handle() {
    if (!isAdmin()) {
      redirect(PATH);
    }
  }
}
