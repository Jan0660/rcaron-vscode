# rcaron-vscode

[RCaron](https://github.com/Jan0660/RCaron) extension for Visual Studio Code.

See [here](https://rcaron.jan0660.dev/ide-plugins#vscode) for more information.

## Language Server

You need to install .NET 7 and the language server manually:

```sh
# uncomment the --prerelease flag if you want to use the latest preview version
dotnet tool install -g rcaron.languageserver # --prerelease
```

You need to have your global .NET tools directory in your PATH environment variable, which is in most cases `~/.dotnet/tools`.
And then you can use the language server from RCaron, because the `rcaron.languageServerPath` setting is set to `rcaron-languageserver` by default.
