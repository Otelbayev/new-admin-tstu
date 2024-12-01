import React, { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { useTranslation } from "react-i18next";
import { Empty } from "antd";
import Loading2 from "../../components/Loading2";
import { useTeachers } from "../../hooks/useTeachers";
import { useFaculties } from "../../hooks/useFaculties";
import { useKafedras } from "../../hooks/useKafedras";

const ChartContainer = () => {
  const { data: faculties, loading: fakLoading } = useFaculties();
  const { kafedras } = useKafedras();
  const { data: teachers, setId } = useTeachers();
  const { t } = useTranslation();

  const [data, setData] = useState([]);
  const [level, setLevel] = useState("faculty");
  const [previousData, setPreviousData] = useState([]);

  const teacherData = useMemo(() => {
    if (!teachers?.length) return [];

    return teachers?.map((e) => ({
      title: `${e?.persons_?.firstName || e?.persons_translation_?.firstName}
                ${e?.persons_?.lastName || e?.persons_translation_?.lastName}
                ${
                  e?.persons_?.fathers_name ||
                  e?.persons_translation_?.fathers_name
                }`,
      avarage_score: e.document110Score,
    }));
  }, [teachers]);

  useEffect(() => {
    setData(faculties?.list);
  }, [faculties]);

  const handleClick = (entry) => {
    if (!entry) return;

    const kafData = kafedras?.list?.filter((e) => e.parent_id === entry.id);

    if (kafData.length > 0) {
      setLevel("kafedra");
      setData(kafData);
      setPreviousData([...previousData, { data, level }]);
    } else {
      setLevel("teacher");
      setId(entry.id);
      setPreviousData([...previousData, { data, level }]);
      setData(teacherData);
    }
  };

  const handleBack = () => {
    if (previousData.length > 0) {
      const previousState = previousData[previousData.length - 1];
      setData(previousState.data);
      setLevel(previousState.level);
      setPreviousData(previousData.slice(0, -1));
    }
  };

  if (fakLoading) {
    return <Loading2 />;
  }
  return (
    <div className="root-container">
      <div className="root-wrapper">
        <div className="title my-3"> Reyting </div>
        <div style={{ textAlign: "center" }}>
          {level !== "faculty" && (
            <button
              className="btn btn-outline-primary"
              onClick={handleBack}
              style={{ marginBottom: "20px" }}
            >
              {t("back")}
            </button>
          )}
          {data?.length ? (
            <ResponsiveContainer width="100%" height={600}>
              <BarChart
                data={data}
                onClick={(e) =>
                  e?.activePayload && handleClick(e.activePayload[0].payload)
                }
              >
                <XAxis dataKey="none" />
                <YAxis domain={[0, 110]} />
                <Tooltip />
                <Bar
                  dataKey="avarage_score"
                  fill={level === "faculty" ? "#8884d8" : "#82ca9d"}
                >
                  <LabelList
                    dataKey="title"
                    position="center"
                    fill="#4f4f4f"
                    style={
                      level === "teacher"
                        ? {
                            writingMode: "vertical-rl",
                            textOrientation: "mixed",
                            position: "relative",
                            zIndex: 99,
                          }
                        : {}
                    }
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartContainer;
