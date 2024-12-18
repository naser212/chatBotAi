import { Button, Modal, Select, Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Formm() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const specializations = [
    "Before specialization",
    "Electrical And Computer",
    "Industrial",
    "Mechanical",
    "Mechatronic",
    "Architecture",
    "Civil",
    "Petroleum",
    "Chemical",
  ];

  const years = ["2019", "2020", "2021", "2022", "2023", "2024", "2025"];
  const schemes = ["scheme 1", "scheme 2"];
  const specific_ece_specs = [
    "not yet specialized",
    "computer systems and networking",
    "power systems",
    "control",
    "communication",
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values) => {
    try {
      console.log("Form Values:", values);
      const response = await fetch("http://localhost:8000/submit_form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        navigate("/back");
      } else {
        console.error("Failed to submit form");
        
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <button  onClick={showModal} 
      className="bg-button rounded-xl md:max-w-72 md:px-12 md:py-3 md:text-lg self-center font-bold text-white ">
        Chat Now
      </button>
      <Modal
        title="Answer the following before start chatting !"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} 
        maskClosable={true}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Choose Specialization"
            name="specialization"
            rules={[{ required: true, message: "Please select a specialization!" }]}
          >
            <Select
              options={specializations.map((specialization) => ({
                value: specialization,
                label: specialization,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Choose Year"
            name="year"
            rules={[{ required: true, message: "Please select a year!" }]}
          >
            <Select
              options={years.map((year) => ({
                value: year,
                label: year,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Choose Scheme"
            name="scheme"
            rules={[{ required: true, message: "Please select a scheme!" }]}
          >
            <Select
              options={schemes.map((scheme) => ({
                value: scheme,
                label: scheme,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="Choose Specific Specialization"
            name="specificEceSpec"
          >
            <Select
              options={specific_ece_specs.map((spec) => ({
                value: spec,
                label: spec,
              }))}
            />
          </Form.Item>

          <div className="flex justify-end">
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
}
