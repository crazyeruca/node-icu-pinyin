{
  "targets": [
    {
      "target_name": "pinyin",
      "sources": [ "src/binding.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
        "deps/icu/include"
      ],
      "conditions": [
        ["OS==\"mac\"", { 

        }],
        ["OS==\"linux\"", {

        }],
        ["OS==\"win\"", {
          "libraries": [
            "../deps/icu/lib64/icudt.lib",
            "../deps/icu/lib64/icuin.lib",
            "../deps/icu/lib64/icuio.lib",
            "../deps/icu/lib64/icule.lib",
            "../deps/icu/lib64/iculx.lib",
            "../deps/icu/lib64/icutu.lib",
            "../deps/icu/lib64/icuuc.lib"
          ],
          "cflags_cc": ["-fexceptions","-Dcimg_display=0"]  
        }]
      ]
    },
    {
      "target_name": "copy_binary",
      "type": "none",
      "dependencies": ["pinyin"],
      "copies":
      [
        {
          'destination': '<(module_root_dir)/bin',
          'files': ['<(module_root_dir)/build/Release/pinyin.node']
        }
      ]
    }
  ]
}
