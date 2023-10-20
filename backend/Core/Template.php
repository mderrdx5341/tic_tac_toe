<?php
namespace Core;

class Template
{
	private $template;
	private $args;

	public function __construct($template, $args = [])
	{
		$this->template = $template;
		$this->args = $args;
	}

	public function render(): string
	{
		foreach ($this->args as $k => $v) {
			$$k = $v;
		}
		ob_start();
		include(__DIR__ . '/../Templates/' . $this->template . '.tpl.php');
		$content = ob_get_clean();
		return $content;
	}
}