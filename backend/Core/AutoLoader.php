<?php
namespace Core;

class AutoLoader
{
	private string $rootPath;

	public function __construct(string $rootPath)
	{
		$this->rootPath = $rootPath;
		spl_autoload_register([$this, 'autoLoadClasses']);
	}

	private function autoLoadClasses(string $name) {
		$tmp = explode('\\', $name);
		$className = array_pop($tmp);
		$pathDir = '/';
		foreach ($tmp as $dir) {
			$pathDir .=  $dir . '/';
		}
		$pathToClassFile = $this->rootPath . $pathDir . $className . '.php';
		if (file_exists($pathToClassFile)) {
			require_once($pathToClassFile);
		} else {
			throw new AutoLoaderException("Class not Found \"{$name}\" path \"{$pathToClassFile}\"");
		}
	}
}

class AutoLoaderException extends \Exception {

}
