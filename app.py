from flask import Flask, render_template, request, redirect, url_for, session
import psycopg2 
from psycopg2 import sql


# ==========================================
# FLASK APP
# ==========================================

app = Flask(
    __name__,
    template_folder="templates"
)
app.secret_key = "flyash_secret_key_2026"

# ==========================================
# DATABASE CONNECTION
# ==========================================

def get_db_connection():
    return psycopg2.connect(
        host="localhost",
        database="flyash_db",
        user="postgres",
        password="pallavi07",
        port="5432"
    )


# ==========================================
# HOME
# ==========================================

@app.route("/")
def home():
    return render_template("index.html")


# ==========================================
# ABOUT
# ==========================================

@app.route("/about")
def about():
    return render_template("about.html")


# ==========================================
# CONTACT
# ==========================================

# ==========================================
# CONTACT
# ==========================================

@app.route("/contact", methods=["GET", "POST"])
def contact():

    if request.method == "POST":
        try:
            name = request.form.get("name")
            email = request.form.get("email")
            phone = request.form.get("phone")
            subject = request.form.get("subject")
            message = request.form.get("message")

            conn = get_db_connection()
            cur = conn.cursor()

            cur.execute("""
                INSERT INTO contact_enquiries_f
                (name, email, phone, subject, message)
                VALUES (%s, %s, %s, %s, %s)
            """, (name, email, phone, subject, message))

            conn.commit()

            cur.close()
            conn.close()

            return redirect(url_for("contact_enquiries"))

        except Exception as e:
            return f"Enquiry save failed: {e}"

    return render_template("contact.html")

# LOGIN
# ==========================================

@app.route("/login", methods=["GET", "POST"])
def login():

    if request.method == "POST":

        email = request.form.get("email")
        password = request.form.get("password")

        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("""
            SELECT *
            FROM login_f
            WHERE email = %s AND password = %s
        """, (email, password))

        user = cur.fetchone()

        cur.close()
        conn.close()

        if user:
            session["user"] = user[0]
            return redirect(url_for("dashboard"))

        return "Invalid Email or Password"

    return render_template("login.html")


# ==========================================
# DASHBOARD
# ==========================================

@app.route("/dashboard")
def dashboard():
    if "user" not in session:
        return redirect(url_for("login"))

    return render_template("dashboard.html")



# ==========================================
# PLANT
# ==========================================

@app.route("/plant", methods=["GET", "POST"])
def plant():
    conn = get_db_connection()
    cur = conn.cursor()

    if request.method == "POST":
        try:
            cur.execute("""
                INSERT INTO plant_f (
                    plant_name,
                    plant_location,
                    fly_ash_requirement,
                    order_date,
                    vehicle_required,
                    loading_status,
                    gate_pass,
                    mseb_gate_entry,
                    additional_details
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                request.form.get("plant_name"),
                request.form.get("plant_location"),
                request.form.get("fly_ash_requirement"),
                request.form.get("order_date"),
                request.form.get("vehicle_required"),
                request.form.get("loading_status"),
                request.form.get("gate_pass"),
                request.form.get("mseb_gate_entry"),
                request.form.get("additional_details")
            ))

            conn.commit()

        except Exception as e:
            conn.rollback()
            print("Plant save error:", e)
            cur.close()
            conn.close()
            return "Plant save error. Flask terminal check kar."

        cur.close()
        conn.close()
        return redirect(url_for("plant"))

    cur.execute("""
        SELECT plant_id, plant_name, plant_location,
               fly_ash_requirement, order_date,
               vehicle_required, loading_status,
               gate_pass, mseb_gate_entry, additional_details
        FROM plant_f
        ORDER BY plant_id DESC
    """)

    plants = cur.fetchall()

    cur.close()
    conn.close()

    return render_template("plant.html", plants=plants)

# CUSTOMER
# ==========================================


# ==========================================
# CUSTOMER DETAILS
# ==========================================

@app.route("/customer", methods=["GET", "POST"])
def customer():

    conn = get_db_connection()
    cur = conn.cursor()

    if request.method == "POST":
        try:
            cur.execute("""
                INSERT INTO customer_f (
                    customer_name,
                    company_name,
                    contact_number,
                    email,
                    address,
                    fly_ash_requirement,
                    requirement_date,
                    order_status,
                    delivery_location,
                    additional_requirement
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                request.form.get("customer_name"),
                request.form.get("company_name"),
                request.form.get("contact_number"),
                request.form.get("email"),
                request.form.get("address"),
                request.form.get("fly_ash_requirement"),
                request.form.get("requirement_date"),
                request.form.get("order_status"),
                request.form.get("delivery_location"),
                request.form.get("additional_requirement")
            ))

            conn.commit()

        except Exception as e:
            conn.rollback()
            print("Customer Save Error:", e)
            return "Customer details save failed. Flask terminal check kar."

        finally:
            cur.close()
            conn.close()

        return redirect(url_for("customer"))

    cur.execute("""
        SELECT customer_id, customer_name, company_name,
               contact_number, email, address,
               fly_ash_requirement, requirement_date,
               order_status, delivery_location,
               additional_requirement
        FROM customer_f
        ORDER BY customer_id DESC
    """)

    customers = cur.fetchall()

    cur.close()
    conn.close()

    return render_template("customer.html", customers=customers)


# ==========================================
# ORDER
# ==========================================


@app.route("/order", methods=["GET", "POST"])
def order():
    conn = get_db_connection()
    cur = conn.cursor()

    if request.method == "POST":
        try:
            cur.execute("""
                INSERT INTO orders_f (
                    order_id,
                    customer_industry_name,
                    fly_ash_quantity,
                    order_date,
                    delivery_location,
                    vehicle_required,
                    order_status,
                    loading_status,
                    order_requirement_details
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                request.form.get("order_id"),
                request.form.get("customer_industry_name"),
                request.form.get("fly_ash_quantity"),
                request.form.get("order_date"),
                request.form.get("delivery_location"),
                request.form.get("vehicle_required"),
                request.form.get("order_status"),
                request.form.get("loading_status"),
                request.form.get("order_requirement_details", "")
            ))

            conn.commit()

        except Exception as e:
            conn.rollback()
            print("Order Save Error:", e)
            return "Order save failed. Flask terminal madhla error check kar."

        finally:
            cur.close()
            conn.close()

        return redirect(url_for("order"))

    cur.execute("""
        SELECT order_id, customer_industry_name,
               fly_ash_quantity, order_date,
               delivery_location, vehicle_required,
               order_status, loading_status,
               order_requirement_details
        FROM orders_f
        ORDER BY order_date DESC
    """)

    orders = cur.fetchall()

    cur.close()
    conn.close()

    return render_template("order.html", orders=orders)


# ==========================================
# VEHICLE
# ==========================================

@app.route("/vehicle", methods=["GET", "POST"])
def vehicle():

    conn = get_db_connection()
    cur = conn.cursor()

    if request.method == "POST":
        try:
            cur.execute("""
                INSERT INTO vehicle_f (
                    vehicle_number,
                    vehicle_type,
                    driver_name,
                    driver_contact,
                    order_id,
                    current_location,
                    vehicle_status,
                    loading_status,
                    delivery_status,
                    gate_pass,
                    transport_details
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                request.form.get("vehicle_number"),
                request.form.get("vehicle_type"),
                request.form.get("driver_name"),
                request.form.get("driver_contact"),
                request.form.get("order_id"),
                request.form.get("current_location"),
                request.form.get("vehicle_status"),
                request.form.get("loading_status"),
                request.form.get("delivery_status"),
                request.form.get("gate_pass"),
                request.form.get("transport_details")
            ))

            conn.commit()

        except Exception as e:
            conn.rollback()
            print("Vehicle save error:", e)
            return "Vehicle details save nahi zale. Flask terminal check kar."

        finally:
            cur.close()
            conn.close()

        return redirect(url_for("vehicle"))

    cur.execute("""
        SELECT vehicle_id, vehicle_number, vehicle_type,
               driver_name, driver_contact, order_id,
               current_location, vehicle_status, loading_status,
               delivery_status, gate_pass, transport_details
        FROM vehicle_f
        ORDER BY vehicle_id DESC
    """)

    transports = cur.fetchall()

    cur.close()
    conn.close()

    return render_template("vehicle.html", transports=transports)


# ==========================================
# PAYMENT
# ==========================================


@app.route("/payment", methods=["GET", "POST"])
def payment():
    conn = get_db_connection()
    cur = conn.cursor()

    try:
        if request.method == "POST":

            cur.execute("""
                INSERT INTO payments_f (
                    payment_id,
                    order_id,
                    customer_industry_name,
                    payment_amount,
                    payment_date,
                    payment_method,
                    payment_status,
                    transaction_reference,
                    additional_details
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                request.form.get("payment_id"),
                request.form.get("order_id"),
                request.form.get("customer_industry_name"),
                request.form.get("payment_amount"),
                request.form.get("payment_date"),
                request.form.get("payment_method"),
                request.form.get("payment_status"),
                request.form.get("transaction_reference") or None,
                request.form.get("additional_details", "")
            ))

            conn.commit()
            return redirect(url_for("payment"))

        cur.execute("""
            SELECT payment_id, order_id,
                   customer_industry_name, payment_amount,
                   payment_date, payment_method,
                   payment_status, transaction_reference,
                   additional_details
            FROM payments_f
            ORDER BY payment_date DESC
        """)

        payments = cur.fetchall()

        return render_template(
            "payment.html",
            payments=payments
        )

    except Exception as e:
        conn.rollback()
        print("Payment Error:", e)
        return "Payment save failed. Flask terminal madhla error check kar."

    finally:
        cur.close()
        conn.close()

# ==========================================
# CONTACT ENQUIRIES
# ==========================================

@app.route("/contact_enquiries")
def contact_enquiries():

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("""
        SELECT id, name, email, phone, subject, message, created_at
        FROM contact_enquiries_f
        ORDER BY created_at DESC
    """)

    enquiries = cur.fetchall()

    cur.close()
    conn.close()

    return render_template(
        "c_enquiries.html",
        enquiries=enquiries
    )


# ==========================================
# REPORT
# ==========================================

@app.route("/report")
def report():
    conn = get_db_connection()
    cur = conn.cursor()

    try:
        cur.execute("""
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      AND table_name IN (
          'contact_enquiries_f',
          'contracts',
          'customer_f',
          'orders_f',
          'payments_f',
          'plant_f',
          'vehicle_f'
      )
    ORDER BY table_name
""")
        table_names = cur.fetchall()
        report_sections = []

        for (table_name,) in table_names:
            cur.execute(
                sql.SQL("SELECT * FROM {}").format(
                    sql.Identifier(table_name)
                )
            )

            rows = cur.fetchall()
            columns = [desc[0] for desc in cur.description]

            report_sections.append({
                "name": table_name,
                "count": len(rows),
                "columns": columns,
                "rows": rows
            })

        return render_template(
            "report.html",
            report_sections=report_sections
        )

    except Exception as e:
        print("Report Error:", e)
        return "Report load failed. Flask terminal madhla error check kar."

    finally:
        cur.close()
        conn.close()



# ==========================================
# RUN APPLICATION
# ==========================================

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5000,
        debug=True
    )