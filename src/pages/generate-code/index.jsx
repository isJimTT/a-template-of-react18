import {
  TlTable,
  TlForm,
  TlSelect,
  TlRangePicker,
  TlMessage,
  TlButton,
} from "tl-frontend-components";
import s from "./index.m.less";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { useMutation, useQuery } from "react-query";

const GenerateCode = ({ Title }) => {
  const nowTime = dayjs().locale("zh-cn");
  const dateFormat = "YYYY-MM-DD HH:mm:ss";
  const [form] = TlForm.useForm();
  const layOut = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 20,
    },
    labelAlign: "left",
  };
  const productOpts = [
    {
      label: "选项二",
      value: 2432,
    },
    {
      label: "选项三",
      value: 3413,
    },
  ];
  const customOpts = [
    {
      label: "选项二",
      value: 1,
    },
    {
      label: "选项三",
      value: 2,
    },
  ];

  const onSubmit = async () => {
    console.log(await form.validateFields());
    mutateAsync("aaa");
  };
  const { mutateAsync, data } = useMutation(
    ["getGenerateCode"],
    (params = {}) => {
      return console.log("请求");
    },
    {
      onSuccess: (data = {}) => {
        console.log(data);
      },
    }
  );

  useQuery(
    ["getProduct"],
    () => {
      return console.log("请求");
    },
    {
      onSuccess: () => {},
    }
  );

  return (
    <div className={s.content}>
      <div className={s.title}>{Title || "生成激活码"}</div>
      <div className={s.from}>
        <TlForm form={form} {...layOut}>
          <TlForm.Item
            label="产品"
            name="product"
            validateFirst
            // rules={[
            //   {
            //     required: true,
            //     message: "请输入设备名称！",
            //   },
            //   {
            //     max: 50,
            //     message: "设备名称长度不能大于50位！",
            //   },
            // ]}
            getValueFromEvent={(value) => {
              // if (value) {
              //   return value.trim()
              // }
              return value;
            }}
          >
            <TlSelect
              width={30 + "vw"}
              options={productOpts}
              placeholder="请选择产品"
            />
          </TlForm.Item>
          <TlForm.Item
            label="客户名称"
            name="custom"
            validateFirst
            // rules={[
            //   {
            //     required: true,
            //     message: "请输入设备名称！",
            //   },
            //   {
            //     max: 50,
            //     message: "设备名称长度不能大于50位！",
            //   },
            // ]}
            getValueFromEvent={(value) => {
              // if (value) {
              //   return value.trim()
              // }
              return value;
            }}
          >
            <TlSelect
              options={customOpts}
              width={30 + "vw"}
              placeholder="请选择用户名称"
            />
          </TlForm.Item>
          <TlForm.Item
            label="有效期"
            name="time"
            validateFirst
            // rules={[
            //   {
            //     required: true,
            //     message: "请输入设备名称！",
            //   },
            //   {
            //     max: 50,
            //     message: "设备名称长度不能大于50位！",
            //   },
            // ]}
            getValueFromEvent={(value) => {
              // if (value) {
              //   return value.trim()
              // }
              return value;
            }}
          >
            <TlRangePicker
              format="YYYY-MM-DD HH:mm:ss"
              shadow={true}
              defaultValue={[dayjs(nowTime, dateFormat)]}
              placeholder={["请选择时间", "请选择时间"]}
            />
          </TlForm.Item>
          <TlButton
            maxLength={50}
            width={30 + "vw"}
            type="primary"
            placeholder="请选择用户名称"
            onClick={onSubmit}
          >
            生成
          </TlButton>
        </TlForm>
      </div>
    </div>
  );
};

export default GenerateCode;
