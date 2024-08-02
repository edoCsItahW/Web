param (
    [string]$tsPath,
    [string]$cppPath
)


[System.Console]::OutputEncoding = [System.Text.Encoding]::GetEncoding("GBK")


# 参数检查
Write-Output "---------------------参数检查阶段---------------------"
if (-not $tsPath) {
    Write-Output "参数阶段: 参数1 - TypeScript文件路径为空!"
    exit 1
}
if (-not $cppPath) {
    Write-Output "参数阶段: 参数2 - C++文件路径为空!"
    exit 1
}
if (-not (Test-Path $cppPath) -or $cppPath -notmatch "\.cpp$") {
    Write-Output "参数阶段: '" $cppPath "' 不存在或不是C++文件!"
    exit 1
}
if (-not (Test-Path $tsPath) -or $tsPath -notmatch "\.ts$") {
    Write-Output "文件索引阶段: '" $tsPath "' 不存在或不是TypeScript文件!"
    exit 1
}


$dirPath = Split-Path $tsPath -Parent
$buildDir = "$dirPath\build"
$newCppPath = Join-Path -Path $dirPath -ChildPath (Split-Path -Path $cppPath -Leaf)


# 复制C++文件
Write-Output  "`n`n---------------------文件索引阶段---------------------"
if (Test-Path $newCppPath) {
    Write-Output "文件索引阶段: 已存在同名C++文件,是否覆盖？(y/n)"
    $confirm = Read-Host
    if ($confirm -ne "y") {
        Write-Output "文件索引阶段: 已取消覆盖操作!"
    }
    else {
        Write-Output "文件索引阶段: 正在覆盖C++文件..."
        Copy-Item -Path $cppPath -Destination $newCppPath -Force
    }
}
else {
    Write-Output "文件索引阶段: 正在复制C++文件..."
    Copy-Item -Path $cppPath -Destination $newCppPath
}


# 依赖检查
Write-Output "`n`n---------------------依赖检查阶段---------------------"
if (-not (Get-Command "node-gyp" -ErrorAction SilentlyContinue)) {
    Write-Output "依赖检查阶段: node-gyp未安装，正在安装..."
    npm install -g node-gyp@latest
    if (-not $?) {
        Write-Output "依赖检查阶段: 安装node-gyp失败!"
        exit 1
    }
    else {
        Write-Output "依赖检查阶段: node-gyp安装成功！"
    }
}


# 编译准备阶段
Write-Output "`n`n---------------------编译准备阶段---------------------"
if (-not (Test-Path $buildDir)) {
    Write-Output "编译阶段: 正在编译C++文件..."
    node-gyp configure
    if (-not $?) {
        Write-Output "编译阶段: 未知错误，编译失败！"
        exit 1
    }
    else {
        Write-Output "编译阶段: 配置成功！"
    }
}

# 编译C++文件
Write-Output "`n`n---------------------编译阶段------------------------"
Write-Output "编译阶段: 正在编译C++文件..."
$commandOutput = & node-gyp build 2>&1
Write-Output $commandOutput


# 处理编译错误
Write-Output "`n`n---------------------处理编译错误---------------------"
$errorStr = "调试信息损坏；请重新编译模块"
if ($commandOutput -match $errorStr) {
    Write-Output "编译阶段: 调试信息损坏 - 清除build文件夹并重试."
    Remove-Item -Path $buildDir -Recurse -Force -Confirm:$false

    node-gyp configure

    & node-gyp build
    if (-not $?) {
        Write-Output "编译阶段: 重试失败,请手动编译！"
        exit 1
    }
    else {
        Write-Output "编译阶段: 编译成功！"
    }
}


Write-Output "`n`n---------------------运行结果------------------------"
ts-node $tsPath
