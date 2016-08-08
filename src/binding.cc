#include <nan.h>
#include "unicode/translit.h"


void Method(const Nan::FunctionCallbackInfo<v8::Value>& info) {
	if (info.Length() < 1) {
		Nan::Error("must have one arguments");
		return;
	}

	if (!info[0]->IsString()) {
		Nan::ThrowTypeError("arguments type must is string");
		return;
	}
	
	char* src = *Nan::Utf8String(info[0]->ToString());

	// 因为引用的ICU DLL 是GBK编码，故此处需要将输入转为GBK编码
    WCHAR *buf;
    int length = MultiByteToWideChar(CP_UTF8, 0, src, -1, NULL, 0);
    buf = new WCHAR[length+1];
    ZeroMemory(buf, (length+1) * sizeof(WCHAR));
    MultiByteToWideChar(CP_UTF8, 0, src, -1, buf, length);

	UErrorCode err;
	Transliterator* pInstance = Transliterator::createInstance("Any-Latin; Latin-ASCII; Lower()", UTRANS_FORWARD, err);
	if (NULL == pInstance)
	{
		info.GetReturnValue().Set(Nan::New("error").ToLocalChecked());
		Nan::Error("create transliterator fail");
		return;
	}

	UnicodeString str(buf);
	pInstance->transliterate(str);

	std::string strDest;
	str.toUTF8String(strDest);

	info.GetReturnValue().Set(Nan::New(strDest.c_str()).ToLocalChecked());
}

void Init(v8::Local<v8::Object> exports) {
  exports->Set(Nan::New("transliterate").ToLocalChecked(),
               Nan::New<v8::FunctionTemplate>(Method)->GetFunction());
}

NODE_MODULE(pinyin, Init)
