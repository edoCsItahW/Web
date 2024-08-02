param (
    [string]$tsPath,
    [string]$cppPath
)


[System.Console]::OutputEncoding = [System.Text.Encoding]::GetEncoding("GBK")


# �������
Write-Output "---------------------�������׶�---------------------"
if (-not $tsPath) {
    Write-Output "�����׶�: ����1 - TypeScript�ļ�·��Ϊ��!"
    exit 1
}
if (-not $cppPath) {
    Write-Output "�����׶�: ����2 - C++�ļ�·��Ϊ��!"
    exit 1
}
if (-not (Test-Path $cppPath) -or $cppPath -notmatch "\.cpp$") {
    Write-Output "�����׶�: '" $cppPath "' �����ڻ���C++�ļ�!"
    exit 1
}
if (-not (Test-Path $tsPath) -or $tsPath -notmatch "\.ts$") {
    Write-Output "�ļ������׶�: '" $tsPath "' �����ڻ���TypeScript�ļ�!"
    exit 1
}


$dirPath = Split-Path $tsPath -Parent
$buildDir = "$dirPath\build"
$newCppPath = Join-Path -Path $dirPath -ChildPath (Split-Path -Path $cppPath -Leaf)


# ����C++�ļ�
Write-Output  "`n`n---------------------�ļ������׶�---------------------"
if (Test-Path $newCppPath) {
    Write-Output "�ļ������׶�: �Ѵ���ͬ��C++�ļ�,�Ƿ񸲸ǣ�(y/n)"
    $confirm = Read-Host
    if ($confirm -ne "y") {
        Write-Output "�ļ������׶�: ��ȡ�����ǲ���!"
    }
    else {
        Write-Output "�ļ������׶�: ���ڸ���C++�ļ�..."
        Copy-Item -Path $cppPath -Destination $newCppPath -Force
    }
}
else {
    Write-Output "�ļ������׶�: ���ڸ���C++�ļ�..."
    Copy-Item -Path $cppPath -Destination $newCppPath
}


# �������
Write-Output "`n`n---------------------�������׶�---------------------"
if (-not (Get-Command "node-gyp" -ErrorAction SilentlyContinue)) {
    Write-Output "�������׶�: node-gypδ��װ�����ڰ�װ..."
    npm install -g node-gyp@latest
    if (-not $?) {
        Write-Output "�������׶�: ��װnode-gypʧ��!"
        exit 1
    }
    else {
        Write-Output "�������׶�: node-gyp��װ�ɹ���"
    }
}


# ����׼���׶�
Write-Output "`n`n---------------------����׼���׶�---------------------"
if (-not (Test-Path $buildDir)) {
    Write-Output "����׶�: ���ڱ���C++�ļ�..."
    node-gyp configure
    if (-not $?) {
        Write-Output "����׶�: δ֪���󣬱���ʧ�ܣ�"
        exit 1
    }
    else {
        Write-Output "����׶�: ���óɹ���"
    }
}

# ����C++�ļ�
Write-Output "`n`n---------------------����׶�------------------------"
Write-Output "����׶�: ���ڱ���C++�ļ�..."
$commandOutput = & node-gyp build 2>&1
Write-Output $commandOutput


# ����������
Write-Output "`n`n---------------------����������---------------------"
$errorStr = "������Ϣ�𻵣������±���ģ��"
if ($commandOutput -match $errorStr) {
    Write-Output "����׶�: ������Ϣ�� - ���build�ļ��в�����."
    Remove-Item -Path $buildDir -Recurse -Force -Confirm:$false

    node-gyp configure

    & node-gyp build
    if (-not $?) {
        Write-Output "����׶�: ����ʧ��,���ֶ����룡"
        exit 1
    }
    else {
        Write-Output "����׶�: ����ɹ���"
    }
}


Write-Output "`n`n---------------------���н��------------------------"
ts-node $tsPath
