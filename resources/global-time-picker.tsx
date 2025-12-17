import React, { useState, useEffect } from "react";

interface TimeZone {
  id: string;
  name: string;
  city: string;
  offset: string;
}

interface GlobalTimePickerProps {
  defaultTimezones?: TimeZone[];
}

const GlobalTimePicker: React.FC<GlobalTimePickerProps> = ({
  defaultTimezones = [],
}) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>(
    new Date().toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    })
  );
  const [timezones, setTimezones] = useState<TimeZone[]>([
    {
      id: "pst",
      name: "Pacific",
      city: "San Francisco",
      offset: "UTC-8",
    },
    {
      id: "est",
      name: "Eastern",
      city: "New York",
      offset: "UTC-5",
    },
    {
      id: "gmt",
      name: "London",
      city: "London",
      offset: "UTC+0",
    },
    {
      id: "jst",
      name: "Tokyo",
      city: "Tokyo",
      offset: "UTC+9",
    },
    {
      id: "kst",
      name: "Seoul",
      city: "Seoul",
      offset: "UTC+9",
    },
  ]);

  // Update time every second for live clock
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setSelectedTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDateDisplay = (date: Date): string => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getTimeInTimezone = (tz: TimeZone): string => {
    const offsetMap: { [key: string]: number } = {
      "UTC-8": -8,
      "UTC-5": -5,
      "UTC+0": 0,
      "UTC+9": 9,
    };

    const offset = offsetMap[tz.offset] || 0;
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const tzDate = new Date(utc + 3600000 * offset);

    return tzDate.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlePrintTime = () => {
    const output = `
╔═══════════════════════════════════════════════════════════╗
║                   GLOBAL TEAM MINT WIDGET                  ║
╠═══════════════════════════════════════════════════════════╣
║                                                            ║
║  Selected Date: ${formatDateDisplay(selectedDate).padEnd(40)} ║
║  Selected Time: ${selectedTime.padEnd(40)} ║
║                                                            ║
╠═══════════════════════════════════════════════════════════╣
║  GLOBAL TIME ZONES                                         ║
╠═══════════════════════════════════════════════════════════╣
${timezones
  .map(
    (tz) =>
      `║  ${tz.city.padEnd(15)} ${getTimeInTimezone(tz).padEnd(10)} ${tz.offset.padEnd(20)} ║`
  )
  .join("\n")}
╚═══════════════════════════════════════════════════════════╝
    `.trim();

    console.log(output);
    alert(output);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #1A1A2E 0%, #16213E 100%)",
        padding: "40px 30px",
        fontFamily: "'IBM Plex Mono', monospace",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Pattern */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 217, 163, 0.03) 2px, rgba(0, 217, 163, 0.03) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0, 217, 163, 0.03) 2px, rgba(0, 217, 163, 0.03) 4px)
          `,
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Content Container */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: "1200px", margin: "0 auto" }}>
        {/* Header */}
        <div
          style={{
            marginBottom: "40px",
            transform: "skew(-2deg)",
            animation: "slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: "#00D9A3",
              textTransform: "uppercase",
              letterSpacing: "-2px",
              textShadow: "4px 4px 0px rgba(0, 168, 232, 0.3)",
              lineHeight: 1.1,
            }}
          >
            Global Team
            <br />
            <span style={{ color: "#00A8E8" }}>Mint Widget</span>
          </h1>
          <div
            style={{
              width: "120px",
              height: "6px",
              background: "#00D9A3",
              marginTop: "15px",
              boxShadow: "0 0 20px rgba(0, 217, 163, 0.5)",
            }}
          />
        </div>

        {/* Main Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "30px",
            marginBottom: "30px",
          }}
        >
          {/* Date Picker Card */}
          <div
            style={{
              background: "#0F3460",
              border: "5px solid #00D9A3",
              padding: "30px",
              position: "relative",
              boxShadow: "12px 12px 0px rgba(0, 168, 232, 0.2)",
              transform: "rotate(-1deg)",
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "rotate(0deg) scale(1.02)";
              e.currentTarget.style.boxShadow = "16px 16px 0px rgba(0, 168, 232, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "rotate(-1deg) scale(1)";
              e.currentTarget.style.boxShadow = "12px 12px 0px rgba(0, 168, 232, 0.2)";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-15px",
                left: "20px",
                background: "#00D9A3",
                color: "#1A1A2E",
                padding: "5px 20px",
                fontWeight: 900,
                fontSize: "14px",
                letterSpacing: "1px",
                border: "3px solid #1A1A2E",
              }}
            >
              DATE
            </div>

            <div style={{ marginTop: "20px" }}>
              <div
                style={{
                  fontSize: "18px",
                  color: "#00D9A3",
                  marginBottom: "15px",
                  fontWeight: 700,
                }}
              >
                {formatDateDisplay(selectedDate)}
              </div>

              <input
                type="date"
                value={selectedDate.toISOString().split("T")[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                style={{
                  width: "100%",
                  padding: "15px",
                  fontSize: "16px",
                  border: "3px solid #00A8E8",
                  background: "#1A1A2E",
                  color: "#00D9A3",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontWeight: 700,
                  outline: "none",
                  transition: "all 0.2s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#00D9A3";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0, 217, 163, 0.2)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#00A8E8";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* Time Picker Card */}
          <div
            style={{
              background: "#0F3460",
              border: "5px solid #00A8E8",
              padding: "30px",
              position: "relative",
              boxShadow: "12px 12px 0px rgba(0, 217, 163, 0.2)",
              transform: "rotate(1deg)",
              transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "rotate(0deg) scale(1.02)";
              e.currentTarget.style.boxShadow = "16px 16px 0px rgba(0, 217, 163, 0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "rotate(1deg) scale(1)";
              e.currentTarget.style.boxShadow = "12px 12px 0px rgba(0, 217, 163, 0.2)";
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-15px",
                left: "20px",
                background: "#00A8E8",
                color: "#1A1A2E",
                padding: "5px 20px",
                fontWeight: 900,
                fontSize: "14px",
                letterSpacing: "1px",
                border: "3px solid #1A1A2E",
              }}
            >
              TIME
            </div>

            <div style={{ marginTop: "20px" }}>
              <div
                style={{
                  fontSize: "42px",
                  color: "#00A8E8",
                  marginBottom: "15px",
                  fontWeight: 900,
                  letterSpacing: "2px",
                  textShadow: "3px 3px 0px rgba(0, 217, 163, 0.2)",
                }}
              >
                {selectedTime}
              </div>

              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                style={{
                  width: "100%",
                  padding: "15px",
                  fontSize: "16px",
                  border: "3px solid #00D9A3",
                  background: "#1A1A2E",
                  color: "#00A8E8",
                  fontFamily: "'IBM Plex Mono', monospace",
                  fontWeight: 700,
                  outline: "none",
                  transition: "all 0.2s",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#00A8E8";
                  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0, 168, 232, 0.2)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#00D9A3";
                  e.currentTarget.style.boxShadow = "none";
                }}
              />
            </div>
          </div>
        </div>

        {/* Timezone Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          {timezones.map((tz, index) => (
            <div
              key={tz.id}
              style={{
                background: "#0F3460",
                border: "4px solid #00D9A3",
                padding: "20px",
                position: "relative",
                transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                animationDelay: `${index * 0.1}s`,
                animation: "fadeInUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
                opacity: 0,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = "#00A8E8";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0, 217, 163, 0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "#00D9A3";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  color: "#00A8E8",
                  fontWeight: 700,
                  marginBottom: "5px",
                  letterSpacing: "1px",
                }}
              >
                {tz.offset}
              </div>
              <div
                style={{
                  fontSize: "16px",
                  color: "#fff",
                  fontWeight: 900,
                  marginBottom: "3px",
                }}
              >
                {tz.city}
              </div>
              <div
                style={{
                  fontSize: "24px",
                  color: "#00D9A3",
                  fontWeight: 900,
                  letterSpacing: "1px",
                }}
              >
                {getTimeInTimezone(tz)}
              </div>
            </div>
          ))}
        </div>

        {/* Print Button */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={handlePrintTime}
            style={{
              background: "#00D9A3",
              color: "#1A1A2E",
              border: "5px solid #00A8E8",
              padding: "20px 50px",
              fontSize: "20px",
              fontWeight: 900,
              textTransform: "uppercase",
              letterSpacing: "2px",
              cursor: "pointer",
              transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
              boxShadow: "8px 8px 0px rgba(0, 168, 232, 0.4)",
              fontFamily: "'IBM Plex Mono', monospace",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translate(-2px, -2px)";
              e.currentTarget.style.boxShadow = "12px 12px 0px rgba(0, 168, 232, 0.6)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translate(0, 0)";
              e.currentTarget.style.boxShadow = "8px 8px 0px rgba(0, 168, 232, 0.4)";
            }}
            onMouseDown={(e) => {
              e.currentTarget.style.transform = "translate(2px, 2px)";
              e.currentTarget.style.boxShadow = "4px 4px 0px rgba(0, 168, 232, 0.4)";
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.transform = "translate(-2px, -2px)";
              e.currentTarget.style.boxShadow = "12px 12px 0px rgba(0, 168, 232, 0.6)";
            }}
          >
            Print Selected Time
          </button>
        </div>
      </div>

      {/* Animations */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700;900&display=swap');

          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-50px) skew(-2deg);
            }
            to {
              opacity: 1;
              transform: translateX(0) skew(-2deg);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          input[type="date"]::-webkit-calendar-picker-indicator,
          input[type="time"]::-webkit-calendar-picker-indicator {
            filter: invert(1);
            cursor: pointer;
          }
        `}
      </style>
    </div>
  );
};

export default GlobalTimePicker;
