import { Button, Card, Col, Form, Input, Row } from "antd";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Wrapper = ({
  children,
  title,
  form,
  onFinish,
  defaultStartDate,
  defaultEndDate,
  back,
  onMaqsadClick,
  create,
}) => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  return (
    <div>
      <Helmet>
        <title>Admin | {title || ""}</title>
      </Helmet>
      <Card style={{ marginTop: "10px" }} title={title?.toUpperCase()}>
        {create && (
          <Button
            type="primary"
            style={{ marginBottom: "10px" }}
            onClick={() => navigate(`/${i18n.language}${create}`)}
          >
            Yaratish
          </Button>
        )}
        {back && (
          <Button
            type="primary"
            onClick={() => navigate(-1)}
            size="large"
            style={{ marginBottom: "10px", width: "60px" }}
            icon={<IoMdArrowBack />}
          />
        )}
        {onMaqsadClick && (
          <Button
            type="primary"
            size="large"
            style={{ marginLeft: "5px" }}
            onClick={onMaqsadClick}
          >
            Maqsadli paramertr
          </Button>
        )}
        {form && (
          <Form
            onFinish={onFinish}
            initialValues={{
              start_date: defaultStartDate,
              end_date: defaultEndDate,
            }}
          >
            <Row
              justify="space-between"
              gutter={[16, 20]}
              style={{ marginBottom: 20 }}
            >
              <Col xs={24} lg={8}>
                <Form.Item name="start_date">
                  <Input type="date" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8}>
                <Form.Item name="end_date">
                  <Input type="date" />
                </Form.Item>
              </Col>
              <Col xs={24} lg={8}>
                <Button
                  htmlType="submit"
                  style={{ width: "100%" }}
                  type="primary"
                >
                  Jadvalni yangilash
                </Button>
              </Col>
            </Row>
          </Form>
        )}
        {children}
      </Card>
    </div>
  );
};

export default Wrapper;
