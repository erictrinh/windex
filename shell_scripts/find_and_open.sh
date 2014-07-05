# searches for apps installed via cask
open "`find /opt/homebrew-cask/Caskroom/ -name $1 | head -1`"
