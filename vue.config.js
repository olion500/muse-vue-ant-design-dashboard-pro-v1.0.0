module.exports = {
	runtimeCompiler: true,
	devServer: {
		proxy: "http://3.39.241.52:3000/",
	},
	chainWebpack: config => {
		config
			.plugin('html')
			.tap(args => {
				args[0].title = 'Muse - Vue Ant Design Dashboard PRO by Creative Tim'
				return args
			})
	}
}
