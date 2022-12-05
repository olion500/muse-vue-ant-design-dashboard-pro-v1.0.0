module.exports = {
	runtimeCompiler: true,
	devServer: {
		proxy: {
			'^/kpiLv1': {
				target: "http://www.ssf-kpi.kr:8080/",
			},
		},
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
